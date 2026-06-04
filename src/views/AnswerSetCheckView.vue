<script setup lang="ts">
import AppPagNav from '@/components/AppPagNav.vue';
import TheCard from '@/components/TheCard.vue';
import type { Pagination } from '@/models/Pagination';
import type { QuestionOption, Question } from '@/models/Question';
import { questionOptionRepository } from '@/repositories/answerRepository';
import { questionRepository } from '@/repositories/questionRepository';
import { submissionRepository } from '@/repositories/submissionRepository';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const questions = ref<Question[]>([]);
const answersMap = ref<Record<number, QuestionOption>>({});
const userAnswersIds = ref<Record<number, {letter: string, answerId: number} | null>>({});

const pagination = ref<Pagination>({
  current_page: 1,
  last_page: 1,
  per_page: 5,
  total: 0
})

const getUserAnswersIds = (listId: number) => {
  try {
    const stored = localStorage.getItem(`list-${listId}`);
    if (stored) {
      userAnswersIds.value = JSON.parse(stored);
      pagination.value.total = Object.entries(userAnswersIds.value).length
      pagination.value.last_page = Object.entries(userAnswersIds.value).length / pagination.value.per_page
      console.log(pagination.value.last_page)
    }
  } catch (e) {
    console.error("Erro ao ler respostas do localStorage", e);
    // Opcional: limpar storage corrompido
  }
}

const fetchQuestions = async (listId: number) => {
  try {
    const { data } = await questionRepository.getQuestionsBySet(listId);
    if (data) {
      questions.value = data;
    }
  } catch (error) {
    console.error("Erro ao buscar questões:", error);
  }
}

const fetchAnswersDetails = async () => {
  // Pega apenas os IDs válidos (números) das respostas do usuário
  const answersToFetch = Object.values(userAnswersIds.value)
    .filter((id): id is {letter: string, answerId: number} => {console.log(typeof id?.answerId); return typeof id?.answerId === 'number'});

  console.log(answersToFetch)

  if (answersToFetch.length === 0) return;

  const answersIdsToFetch = answersToFetch.map(a => a.answerId)

  try {
    // Busca detalhes das respostas (Texto, se está corresta, etc)
    const { data } = await questionOptionRepository.getListById(answersIdsToFetch);

    if (data) {
      // Transforma array em objeto para acesso rápido: { [questionId]: QuestionOption }
      const map: Record<number, QuestionOption> = {};
      data.forEach(option => {
        // Map by question_id to get quick access
        map[option.question_id] = option;
      });
      answersMap.value = map;
    }
  } catch (error) {
    console.error("Erro ao buscar detalhes das respostas:", error);
  }
}

const submitAnswers = async (listId: number) => {
  try {
    const answers = Object.entries(userAnswersIds.value)
      .filter(([, answer]) => answer !== null)
      .map(([questionId, answer]) => ({
        question_id: Number(questionId),
        option_id: answer!.answerId,
      }));

    // Pegamos o "data" que retorna da API
    const { data, error } = await submissionRepository.createSubmission({
      question_set_id: listId,
      answers: answers,
    });

    if (error) {
      console.error('Erro ao enviar submissão:', error);
    } else {
      console.log('Submissão enviada com sucesso!');
      // NOVO: Salva o ID da submissão vinculado ao ID da lista
      if (data && data.id) {
        localStorage.setItem(`last-submission-${listId}`, String(data.id));
      }
    }
  } catch (err) {
    console.error('Erro ao processar submissão:', err);
  }
}

onMounted(async () => {
  const listId = Number(route.params.id);

  getUserAnswersIds(listId);
  await fetchQuestions(listId);
  await fetchAnswersDetails();
  
  // Enviar submissão após buscar todos os detalhes
  await submitAnswers(listId);
});
</script>

<template>
  <main class="flex p-16 min-h-screen gap-8">
    <div class="flex flex-col gap-8 flex-1">
      <h1 class="text-3xl text-black">Seu Gabarito</h1>
      <ul class="text-lg flex flex-col gap-8">
        <li
          class="text-black h-min"
          v-for="(question, i) in questions.slice((pagination.current_page - 1) * pagination.per_page, pagination.current_page * pagination.per_page)"
          :key="question.id"
        >
          <TheCard inside-class="justify-center gap-4 p-6">
            <h2 class="text-xl leading-4">Questão {{ i + 1 + pagination.per_page * (pagination.current_page - 1) }}</h2>
            <span class="w-full h-[1px] block bg-[#D9D9D9] rounded"></span>

            <p class="font-light text-lg leading-6">{{ question.statement }}</p>

            <div
              v-if="answersMap[question.id]"
              class="flex items-center gap-5 rounded-2xl"
            >
              <span
                :class="[
                  'flex justify-center items-center text-2xl text-white aspect-square h-10 leading-0 pt-1 rounded-lg',
                  answersMap[question.id]?.is_correct ? 'bg-[#1D3F69]' : 'bg-[#AA4243]'
                ]"

              >
                {{ userAnswersIds[question.id]?.letter }}
              </span>
              <p class="font-light text-lg">{{ answersMap[question.id]?.text }}</p>
            </div>

            <div v-else class="text-gray-500 italic mt-2">
              Questão não respondida.
            </div>

          </TheCard>
        </li>
      </ul>
      <AppPagNav v-if="pagination.last_page > 1" v-model="pagination"/>
    </div>
    <div class="flex flex-col gap-8">
      <TheCard title="Sua Nota" inside-class="text-black">
        <div class="flex flex-col justify-center">
          <h2 class="text-lg">Você acertou:</h2>
          <span class="flex justify-center items-center text-3xl h-22 rounded-xl w-full bg-white shadow-lg/10">
            {{ Object.values(answersMap).filter(a => a.is_correct).length }} / {{ Object.keys(userAnswersIds).length }}
          </span>
        </div>
      </TheCard>

      <ul class="grid grid-cols-5 h-min gap-2 text-black">
        <li
          v-for="(value, i) in questions"
          :key="value.id"
          :class="[
            'aspect-square border-2 text-center text-xl rounded-xl p-2 select-none',
            answersMap[value.id] ? answersMap[value.id].is_correct ? 'bg-[#1D3F69] border-[#1D3F69] text-white' : 'bg-[#AA4243] text-white' : '']"
        >
          <p class="leading-4 pt-1">{{ i + 1 }}</p>
        </li>
      </ul>
    </div>
  </main>
</template>
