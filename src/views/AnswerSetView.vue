<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { List } from '@/models/List';
import TheCard from '@/components/TheCard.vue';
import TheAnswers from '@/components/TheAnswers.vue';
import TheTimer from '@/components/TheTimer.vue';
import { questionRepository } from '@/repositories/questionRepository';
import { questionSetRepository } from '@/repositories/questionSetRepository';
import type { Pagination } from '@/models/Pagination';
import AppPagNav from '@/components/AppPagNav.vue';
import { usePopUp } from '@/composables/popup';
import type { Question } from '@/models/Question';

const route = useRoute()
const router = useRouter()
const question = ref<Question | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)
const showCorrect = ref(false);
const main = ref<HTMLElement | null>(null);

const list = ref<List | null>(null)

const fetchList = async (id: number) => {
  loading.value = true
  error.value = null

  const { data } = await questionSetRepository.getListById(id)
  list.value = data!
}

const questionIDs = ref<number[]>([])
const isLoading = ref(false)

async function fetchQuestionIDs(questionSetId: number) {
  isLoading.value = true
  error.value = null

  const { data } = await questionRepository.getQuestionsByQuestionSetId(questionSetId)
  questionIDs.value = data!
}

const pagination = ref<Pagination>({
  current_page: 0,
  last_page: 0,
  per_page: 0,
  total: 0
});

const initPagination = () => {
  pagination.value = {
    total: questionIDs.value.length,
    current_page: 1,
    last_page: questionIDs.value.length,
    per_page: 1
  }
}

const fetchQuestion = async (id: number) => {
  loading.value = true
  error.value = null

  const { data }= await questionRepository.getQuestion(id, ["answers"])
  console.log(data)
  question.value = data!

}

const userAnswers = ref<Record<number, {letter: string, answerId: number} | null>>({});

const initializeAnswers = () => {
  const newAnswers: Record<number, {letter: string, answerId: number} | null> = {};
  const stored = localStorage.getItem(`list-${list.value?.id}`);

  if (stored) {
    const parsed = JSON.parse(stored);
    Object.assign(userAnswers.value, parsed);
    return
  }

  questionIDs.value.forEach((id) => {
    newAnswers[id] = userAnswers.value[id] || null;
  });

  localStorage.setItem(`list-${list.value?.id}`, JSON.stringify(userAnswers.value));
  userAnswers.value = newAnswers;
};

const currentQuestionId = computed(() => {
  return questionIDs.value[pagination.value.current_page - 1];
});

const { open } = usePopUp();

const finishList = () => {
  open(() => {
    router.push(`/lists/${list.value?.id}/answer/check`)
  })
}

onMounted(async () => {
  await fetchList(Number(route.params.id));
  await fetchQuestionIDs(Number(route.params.id));
  initPagination()

  initializeAnswers();

  if (questionIDs.value.length > 0) {
    await fetchQuestion(questionIDs.value[0]);
  }
});

watch(() => pagination.value.current_page, async () => {
  await fetchQuestion(questionIDs.value[pagination.value.current_page - 1]);
  main.value?.scrollIntoView({
    behavior: 'smooth', // Faz a animação suave
    block: 'start'      // Alinha o topo do elemento com o topo da janela
  });
})

watch(userAnswers, async () => {
  localStorage.setItem(`list-${list.value?.id}`, JSON.stringify(userAnswers.value));
}, { deep: true })

watch(() => route.params.id, async (newId) => {
  await fetchList(Number(newId));
  await fetchQuestionIDs(Number(newId));
  if (questionIDs.value.length > 0) {
    initPagination()
    await fetchQuestion(questionIDs.value[0]);
  }
});
</script>

<template>
  <main ref="main" class="flex flex-col w-full p-16 gap-8">
    <header class="w-full flex items-center justify-between">
      <div class="flex gap-3 h-full w-fit items-center">
        <h1 class="text-black text-2xl leading-none align-middle p-0 m-0 inline mt-1.5">{{ list?.name ?? 'Carregando...' }}</h1>
      </div>
    </header>
    <div class="flex gap-8">
      <TheCard class="flex-1" :title="'Questão #' + (pagination.current_page)">
        <p class=" text-xl font-light text-black">{{ question?.statement }}</p>
      </TheCard>
      <div class="flex flex-col gap-8 min-w-92">
        <ul :class="[
          'grid gap-2 text-black',
          questionIDs.length < 20 ? 'grid-cols-5' : 'grid-cols-10'
        ]">
          <li
            v-for="(value, i) in questionIDs"
            :key="i"
            :class="[
              'flex justify-center items-center aspect-square border-2 text-center text-xl rounded-lg p-2 select-none hover:cursor-pointer',
              userAnswers[value] ? 'bg-[#1D3F69] border-[#1D3F69] text-white' : '',
              pagination.current_page - 1 === i ? 'bg-black text-white' : ''
            ]"
            @click="pagination.current_page = i + 1"
          >
            <p class="leading-4 pt-1">{{ i + 1 }}</p>
          </li>
        </ul>
        <!--
        <TheCard title="Informações">
          <ul class="text-base p-5 flex flex-col items-center gap-2 text-black">
            <li class="w-full">Criador: {{ question?.user?.name ?? 'indefinido'}}</li>
            <li class="w-full">Fonte: {{ question?.source?.Type ?? 'indefinido' }}</li>
            <li class="w-full">Data: {{ question?.created_at.slice(0,4) ?? 'indefinido' }}</li>
            <li class="w-full">Disciplina: {{ question?.subject?.Name ?? 'indefinido' }}</li>
          </ul>
        </TheCard>
        -->
        <TheTimer />
        <button @click="finishList" class="bg-black text-white py-3 w-full rounded-lg text-lg hover:cursor-pointer"> Terminar Lista </button>
      </div>
    </div>

    <TheAnswers :answers="question?.answers ?? []" :show-correct="showCorrect" v-model:selected-answer="userAnswers[currentQuestionId]" />

    <AppPagNav v-model="pagination" />
  </main>
</template>
