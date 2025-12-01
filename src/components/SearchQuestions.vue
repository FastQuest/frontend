<script setup lang="ts">
import QuestionsNav from '@/components/QuestionsNav.vue'
import { API_BASE_URL } from '@/config/api'
import type { DetailQuestion } from '@/models/DetailQuestion'
import type { NewList } from '@/models/NewList'
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useDebounceFn, useWindowSize } from '@vueuse/core'
import { limitChars } from '@/utils/text'

defineProps({
  addButton: Boolean,
})

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

const route = useRoute()
const router = useRouter()
const { height } = useWindowSize()

const questions = ref<QuestionResponse | null>(null)
const isAddingToList = ref(false)

const newList = ref<NewList>({
  name: '',
  type: 'list',
  desc: '',
  is_private: false,
  user_id: 1,
  questions: []
})

const fetchQuestions = async () => {
  const query = new URLSearchParams({
    ...route.query,
    limit: '10',
    detail: 'information'
  })

  try {
    const res = await fetch(`${API_BASE_URL}/questions?${query}`)
    const data = (await res.json()) as QuestionResponse

    const maxChars = Math.round(height.value / 3.5)
    data.data = data.data.map(q => ({
      ...q,
      statement: limitChars(q.statement, maxChars)
    }))

    questions.value = data
  } catch (err) {
    console.error('Erro ao buscar questões:', err)
  }
}

const debouncedFetch = useDebounceFn(fetchQuestions, 300)

const goToQuestion = (id: number) => {
  if (!isAddingToList.value) router.push(`/questions/${id}`)
}

const toggleQuestionInList = (id: number) => {
  const list = newList.value.questions
  if (list.includes(id)) {
    newList.value.questions = list.filter(q => q !== id)
  } else {
    list.push(id)
  }
}

onMounted(async () => {
  await fetchQuestions()

  if (route.path === '/list/addquestion') {
    isAddingToList.value = true
    const stored = localStorage.getItem('newListData')
    if (stored) {
      Object.assign(newList.value, JSON.parse(stored))
    } else {
      router.replace('/create-list')
    }
  }
})

watch(() => route.query, debouncedFetch, { deep: true })

watch(newList, newValue => {
  if (isAddingToList.value) {
    localStorage.setItem('newListData', JSON.stringify(newValue))
  }
}, { deep: true })
</script>

<template>
  <div class="flex flex-col gap-7">
    <ul v-if="questions" class="grid grid-rows-4 gap-5">
      <li
        v-for="question in questions.data"
        :key="question.id"
        class="bg-[#FAFAFA] shadow-lg/30 flex items-center w-full pr-5 rounded-2xl hover:cursor-pointer relative"
        @click="goToQuestion(question.id!)"
      >
        <ul class="text-black text-lg flex flex-col justify-around h-full w-2/5 p-5 rounded-l-2xl">
          <li>Criador: {{ question.user?.name ?? 'Indefinido' }}</li>
          <li>Fonte: {{ question.source?.Name ?? 'Indefinido' }}</li>
          <li>Data: {{ question.source?.Metadata.year ?? question.created_at.slice(0, 4) }}</li>
          <li>Disciplina: {{ question.subject?.Name ?? 'Indefinido' }}</li>
        </ul>

        <span class="block bg-[#D9D9D9] w-[2px] h-[83%]"></span>

        <p class="text-black font-light w-full p-4 text-lg break-words line-clamp-5">
          {{ question.statement }}
        </p>

        <button
          v-if="isAddingToList"
          @click.stop="toggleQuestionInList(question.id!)"
          class="bg-black h-12 p-2 rounded-xl aspect-square absolute -top-6 -right-6 cursor-pointer transition hover:scale-105"
        >
          <img
            class="object-contain h-full"
            :src="newList.questions.includes(question.id!) ? '/imgs/check.svg' : '/imgs/plus.png'"
            alt=""
          />
        </button>
      </li>
    </ul>

    <div v-else class="flex-1 flex justify-center items-center text-black">
      <p>Carregando questões...</p>
    </div>

    <QuestionsNav
      v-if="questions?.pagination.total > 1"
      :pagination="questions.pagination"
    />
  </div>
</template>
