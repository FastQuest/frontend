<script setup lang="ts">
import QuestionsNav from '@/components/QuestionsNav.vue'
import { API_BASE_URL } from '@/config/api';
import type { DetailQuestion } from '@/models/DetailQuestion.ts';
import type { NewList } from '@/models/NewList';
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute();
const router = useRouter();

interface Pagination {
  current_page: number
  last_page: number
  per_page: number
  total: number
}

interface QuestionResponse {
  data: DetailQuestion[]
  pagination: Pagination
}

const questions = ref<QuestionResponse | null>(null)

const limitChars = (text: string, max = 300): string => {
  return text.length <= max ? text : text.slice(0, max) + '…';
};


function debounce<T extends (...args: any[]) => void>(fn: T, delay: number) {
  let timeoutId: ReturnType<typeof setTimeout> | null = null
  return (...args: Parameters<T>) => {
    if (timeoutId) clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn(...args), delay)
  }
}

const fetchQuestions = async () => {
  questions.value = null;

  const query = new URLSearchParams({
    ...route.query,
    limit: "4",
    detail: "information"
  });

  try {
    const res = await fetch(`${API_BASE_URL}/questions?${query}`)
    const data = await res.json() as QuestionResponse
    console.log(data);

    data.data = data.data.map(q => ({
      ...q,
      statement: limitChars(q.statement, Math.round(window.innerHeight / 3.5))
    }))

    questions.value = data
  } catch (err) {
    console.error('Erro ao buscar questões:', err)
  }
}

const debouncedFetch = debounce(fetchQuestions, 300)

const goToQuestion = (id: number) => {
  if (!addTolist.value) router.push('/questions/' + id)
}

const addTolist = ref<boolean>(false);

const newListData = ref<NewList>({
  name: "",
  type: "list",
  desc: "",
  is_private: false,
  user_id: 1,
  questions: []
})

const addToNewList = (id: number) => {
  if (!newListData.value.questions.includes(id)) {
    newListData.value.questions.push(id);
  } else {
    newListData.value.questions = newListData.value.questions.filter(item => item !== id);

  }
  localStorage.setItem("newListData", JSON.stringify(newListData.value));
}

onMounted(async () => {
  await fetchQuestions()
  if (route.path === "/search/add-to-list") {
    addTolist.value = true;

    const stored = localStorage.getItem('newListData');

    if (stored) {
      const parsed = JSON.parse(stored);
      Object.assign(newListData.value, parsed);
    } else {
      router.replace('/create-list');
    }
  }
});

watch(() => route.fullPath, () => {
  debouncedFetch();
})
</script>

<template>
  <div class="h-[110vh] flex flex-col gap-7">
    <ul v-if="questions" class="flex flex-col gap-auto h-full gap-5">
      <li
        v-for="question in questions.data"
        :key="question.id"
        class="bg-[#FAFAFA] shadow-lg/30 flex items-center max-h-1/4 h-1/4 w-full pr-5 rounded-2xl hover:cursor-pointer relative"
        @click="goToQuestion(question.id!)"
      >
        <ul class="text-black text-lg flex flex-col justify-around h-full w-2/5 p-5 rounded-tl-2xl rounded-bl-2xl">
          <li>Criador: {{ question.user?.name ?? 'Indefinido' }}</li>
          <li>Fonte: {{ question.source?.Name ?? 'Indefinido'}}</li>
          <li>Data: {{ question.source?.Metadata.year ?? question.created_at.slice(0, 4) }}</li>
          <li>Disciplina: {{ question.subject?.Name ?? 'Indefinido' }}</li>
        </ul>
        <span class="block bg-[#D9D9D9] w-[2px] h-10/12"></span>
        <p
          class="text-black font-light h-full w-full p-4 text-lg text-ellipsis break-words line-clamp-5"
        >
          {{ question.statement }}
        </p>
        <button @click="addToNewList(question.id!)" v-if="addTolist" class="bg-main h-12 p-2 rounded-xl aspect-square absolute right-[-2%] top-[-10%] cursor-pointer">
          <img class="object-contain h-full" :src="newListData.questions.includes(question.id!) ? '/public/imgs/close.png' : '/public/imgs/plus.png'" alt="">
        </button>
      </li>
    </ul>

    <div v-else class="h-full w-full flex justify-center items-center flex-col text-black">
      <p>Carregando questões...</p>
    </div>

    <QuestionsNav :pagination="questions?.pagination!" v-if="questions?.pagination.total != 1"/>
  </div>
</template>

<style scoped>
a {
  font-weight: 300;
  line-height: 1;
}

.bg-header {
  background: linear-gradient(180deg, #6686AF 0%, #1D3F69 100%);
}
</style>
