<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import TheCard from '@/components/ui/TheCard.vue';
import { submissionRepository, type Submission } from '@/repositories/submissionRepository';
import { questionOptionRepository } from '@/repositories/answerRepository';
import type { QuestionOption } from '@/models/Question';

const props = defineProps<{
  questionSetId: number;
}>()

const lastSubmission = ref<Submission | null>(null);
const submissionOptions = ref<Record<number, QuestionOption>>({});
const isLoading = ref(true);

const grade = computed(() => {
  if (!lastSubmission.value || !lastSubmission.value.answers) return null;
  
  const answers = lastSubmission.value.answers;
  if (answers.length === 0) return null;

  let hits = 0;
  answers.forEach(answer => {
    const option = submissionOptions.value[answer.option_id];
    if (option && option.is_correct) {
      hits++;
    }
  });

  return {
    hits,
    total: answers.length
  };
})

onMounted(async () => {
  try {
    // 1. Tenta resgatar o ID da submissão gerada
    const savedId = localStorage.getItem(`last-submission-${props.questionSetId}`);
    let submissionData = null;

    if (savedId) {
      // 2. Busca pela rota documentada GET /submissions/{id}
      const { data } = await submissionRepository.getSubmissionById(Number(savedId), 'answers');
      submissionData = data;
    } else {
      // Fallback para o método de listagem caso não tenha o ID no storage
      const { data } = await submissionRepository.getLastSubmission(props.questionSetId);
      submissionData = data;
    }

    // 3. Valida se as 'answers' vieram populadas (graças ao ?include=answers)
    if (submissionData && submissionData.answers) {
      lastSubmission.value = submissionData;
      
      const optionIds = submissionData.answers.map((a: any) => a.option_id);
      
      if (optionIds.length > 0) {
        const { data: options } = await questionOptionRepository.getListById(optionIds);
        if (options) {
          const map: Record<number, QuestionOption> = {};
          options.forEach((option: any) => {
            map[option.id] = option;
          });
          submissionOptions.value = map;
        }
      }
    }
  } catch (err) {
    console.error('Erro ao buscar última submissão:', err);
  } finally {
    isLoading.value = false;
  }
})
</script>

<template>
  <TheCard title="Seu Último Resultado" class="text-black w-92" inside-class="justify-between h-full" inside-pd="md">
    <div class="flex flex-col justify-center">
      <h2>Você acertou:</h2>
      <span class="flex justify-center items-center text-3xl h-22 rounded-xl w-full bg-white shadow-lg/20">
        <p v-if="grade && !isLoading">{{ grade.hits }} / {{ grade.total }}</p>
        <img v-else class="h-8" src="/public/imgs/lock.svg" alt="">
      </span>
    </div>
    <p v-if="grade && !isLoading" class="font-light">Veja um resumo do seu desempenho e explore os detalhes de cada questão para entender melhor seus acertos e pontos a melhorar. </p>
    <p v-else class="font-light">Aqui vai aparecer um resumo do seu desempenho e onde você poderá explorar os detalhes de cada questão para entender melhor seus acertos e pontos a melhorar.</p>
  </TheCard>
</template>
