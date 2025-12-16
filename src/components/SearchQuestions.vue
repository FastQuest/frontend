<script setup lang="ts">
import QuestionsNav from '@/components/QuestionsNav.vue'
import type { NewList } from '@/models/NewList'
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useDebounceFn, useWindowSize } from '@vueuse/core'
import { limitChars } from '@/utils/text'
import { type Question } from '@/models/Question'
import { questionRepository } from '@/repositories/questionRepository'
defineProps({
  addButton: Boolean,
})

interface Pagination {
  current_page: number
  last_page: number
  per_page: number
  total: number
}

const route = useRoute()
const router = useRouter()
const { height } = useWindowSize()

const questions = ref<Question[]>()
const pagination = ref<Pagination>()
const isAddingToList = ref(false)

const fetchError = ref<unknown | undefined>()

const newList = ref<NewList>({
  name: '',
  type: 'list',
  description: '',
  is_private: false,
  user_id: 1,
  questions: []
})

const fetchQuestions = async () => {
  const { data, error } = await questionRepository.getQuestions({
    ...route.query,
    perPage: 10,
    include: ["source", "user", "subject"]
  })

  if (!data) {
    fetchError.value = error
    questions.value = []
    return
  }

  console.log(data)

  const maxChars = Math.round(height.value / 3.5)

  questions.value = data.items.map(q => {
    q.statement = limitChars(q.statement, maxChars)
    return q
  })

  pagination.value = data.pagination
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
    <ul v-if="questions" class="grid grid-rows-10 gap-5">
      <li
        v-for="question in questions"
        :key="question.id"
        class="bg-[#FAFAFA] shadow-lg/30 flex items-center w-full pr-5 rounded-2xl hover:cursor-pointer relative"
        @click="goToQuestion(question.id!)"
      >
        <ul class="text-black text-lg flex flex-col justify-around h-full w-2/5 p-5 rounded-l-2xl">
          <li>Criador: {{ question.user?.name ?? 'Indefinido' }}</li>
          <li>Fonte: {{ question.source?.name ?? 'Usuário' }}</li>
          <li>Data: {{ question.source?.metadata.year ?? question.createdAt.slice(0, 4) }}</li>
          <li>Disciplina: {{ question.subject?.name ?? 'Indefinido' }}</li>
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
      <li v-if="questions.length < 1" class="flex items-center justify-center h-40">
        <p v-if="fetchError" class="text-gray-700 text-center text-lg">Error ao carregar questões.</p>
        <p v-else class="text-gray-700 text-center text-lg">Nenhuma questão encontrada.</p>
      </li>
    </ul>

    <div v-else class="grid grid-rows-10 gap-5">
      <li class="flex items-center justify-center h-40">
        <p class="text-gray-700 text-center text-lg">Carregando questões...</p>
      </li>
    </div>

    <QuestionsNav
      v-if="pagination?.total ?? 0 > 1"
      :pagination="pagination!"
    />
  </div>
</template>
