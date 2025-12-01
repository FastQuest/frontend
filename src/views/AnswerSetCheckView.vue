<script setup lang="ts">
import AppPagNav from '@/components/AppPagNav.vue';
import QuestionsNav from '@/components/QuestionsNav.vue';
import TheCard from '@/components/TheCard.vue';
import type { Pagination } from '@/models/Pagination';
import type { Answer, Question } from '@/models/Question';
import { answerRepository } from '@/repositories/answerRepository';
import { questionRepository } from '@/repositories/questionRepository';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const questions = ref<Question[]>([]);
const answersMap = ref<Record<number, Answer>>({});
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
    // Busca detalhes das respostas (Texto, se está correta, etc)
    const { data } = await answerRepository.getListById(answersIdsToFetch);

    if (data) {
      // Transforma array em objeto para acesso rápido: { [questionId]: Answer }
      const map: Record<number, Answer> = {};
      data.forEach(ans => {
        map[ans.QuestionID] = ans;
      });
      answersMap.value = map;
    }
  } catch (error) {
    console.error("Erro ao buscar detalhes das respostas:", error);
  }
}

onMounted(async () => {
  const listId = Number(route.params.id);

  getUserAnswersIds(listId);
  await fetchQuestions(listId);
  await fetchAnswersDetails();
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
          :key="question.ID"
        >
          <TheCard inside-class="justify-center gap-4 p-6">
            <h2 class="text-xl leading-4">Questão {{ i + 1 + pagination.per_page * (pagination.current_page - 1) }}</h2>
            <span class="w-full h-[1px] block bg-[#D9D9D9] rounded"></span>

            <p class="font-light text-lg leading-6">{{ question.Statement }}</p>

            <div
              v-if="answersMap[question.ID]"
              class="flex items-center gap-5 rounded-2xl"
            >
              <span
                :class="[
                  'flex justify-center items-center text-2xl text-white aspect-square h-10 leading-0 pt-1 rounded-lg',
                  answersMap[question.ID]?.Is_correct ? 'bg-[#1D3F69]' : 'bg-[#AA4243]'
                ]"

              >
                {{ userAnswersIds[question.ID]?.letter }}
              </span>
              <p class="font-light text-lg">{{ answersMap[question.ID]?.Text + " " + answersMap[question.ID]?.Is_correct}}</p>
            </div>

            <div v-else class="text-gray-500 italic mt-2">
              Questão não respondida.
            </div>

          </TheCard>
        </li>
      </ul>
      <AppPagNav v-model="pagination"/>
    </div>
    <div class="flex flex-col gap-8">
      <TheCard title="Sua Nota" inside-class="text-black">
        <div class="flex flex-col justify-center">
          <h2 class="text-lg">Você acertou:</h2>
          <span class="flex justify-center items-center text-3xl h-22 rounded-xl w-full bg-white shadow-lg/10">
            {{ Object.values(answersMap).filter(a => a.Is_correct).length }} / {{ Object.keys(userAnswersIds).length }}
          </span>
        </div>
      </TheCard>

      <ul class="grid grid-cols-5 h-min gap-2 text-black">
        <li
          v-for="(value, i) in questions"
          :key="value.ID"
          :class="[
            'aspect-square border-2 text-center text-xl rounded-xl p-2 select-none',
            answersMap[value.ID] ? answersMap[value.ID].Is_correct ? 'bg-[#1D3F69] border-[#1D3F69] text-white' : 'bg-[#AA4243] text-white' : '']"
        >
          <p class="leading-4 pt-1">{{ i + 1 }}</p>
        </li>
      </ul>
    </div>
  </main>
</template>
