<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import type { DetailQuestion } from '@/models/DetailQuestion.ts';
import { API_BASE_URL } from '@/config/api';
import type { List } from '@/models/List';
import TheTimer from '@/components/TheTimer.vue';

const route = useRoute()
const question = ref<DetailQuestion | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)
const showCorrect = ref(false);

const list = ref<List | null>(null)

const fetchList = async (id: string | number) => {
  loading.value = true
  error.value = null

  try {
    const res = await fetch(`${API_BASE_URL}/question-set/${id}`)
    if (!res.ok) throw new Error(`Erro ao buscar questão: ${res.status}`)
    const data: List = await res.json()
    list.value = data
  } catch (err: any) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

const questionIDs = ref<number[]>([])
const position = ref<number>(0)
const isLoading = ref(false)

async function fetchQuestionIDs(questionSetId: string | number) {
  isLoading.value = true
  error.value = null

  try {
    const res = await fetch(`${API_BASE_URL}/question-set/${questionSetId}/question-ids`)

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`)
    }

    const data = await res.json()
    questionIDs.value = data
  } catch (err: any) {
    error.value = err.message
  } finally {
    isLoading.value = false
  }
}

const answerSwitch = () => {
  showCorrect.value = !showCorrect.value
  console.log(showCorrect.value)
}

const fetchQuestion = async (id: string | number) => {
  loading.value = true
  error.value = null

  try {
    const res = await fetch(`${API_BASE_URL}/question/${id}?detail=full`)
    if (!res.ok) throw new Error(`Erro ao buscar questão: ${res.status}`)
    const data: DetailQuestion = await res.json()
    question.value = data
    console.log(question.value)
  } catch (err: any) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

const userAnswers = ref<Record<number, number | null>>({});

const initializeAnswers = () => {
  const newAnswers: Record<number, number | null> = {};

  questionIDs.value.forEach((id) => {
    // Preserva respostas existentes ou inicializa como null
    newAnswers[id] = userAnswers.value[id] || null;
  });

  userAnswers.value = newAnswers;
};

const selectAnswer = (questionId: number, answerId: number) => {
  userAnswers.value[questionId] = answerId;
};

const currentQuestionId = computed(() => {
  return questionIDs.value[position.value];
});

const allAnswered = computed(() => {
  return Object.values(userAnswers.value).every((val) => val !== null);
});

const goToPrevious = async () => {
  if (position.value > 0) {
    position.value--;
    await fetchQuestion(questionIDs.value[position.value]);
  }
};

const goToNext = async () => {
  if (position.value < questionIDs.value.length - 1) {
    position.value++;
    await fetchQuestion(questionIDs.value[position.value]);
  }
};

onMounted(async () => {
  await fetchList(route.params.id as string);
  await fetchQuestionIDs(route.params.id as string);

  initializeAnswers();

  if (questionIDs.value.length > 0) {
    await fetchQuestion(questionIDs.value[0]);
  }
});

watch(() => route.params.id, async (newId) => {
  await fetchList(newId as string);
  await fetchQuestionIDs(newId as string);
  if (questionIDs.value.length > 0) {
    position.value = 0;
    await fetchQuestion(questionIDs.value[0]);
  }
});
</script>

<template>
  <main class="grid grid-template-questions auto-rows-min p-16 gap-10">
    <div class="rounded-2xl overflow-hidden shadow-lg/30 bg-[#FAFAFA]">
      <header class="bg-black text-white">
        <h1 class="text-center text-xl p-5">Questão #{{ question?.id }}</h1>
      </header>
      <p class="p-10 text-black font-light text-lg">{{ question?.statement }}</p>
    </div>
        <div class="flex flex-col gap-5">
      <div class="shadow-lg/30 overflow-hidden rounded-2xl">
        <header class="bg-black text-white">
          <h1 class="text-center text-xl p-5">Informações</h1>
        </header>
        <div class="flex flex-col p-10 bg-[#FAFAFA] text-black font-light text-lg h-full ">
          <ul class="flex flex-col">
            <li><b>Criador:</b> {{ question?.user.name }}</li>
            <li><b>Data:</b> {{ question?.created_at.slice(0, 4) }}</li>
            <li><b>Disciplina:</b> {{ question?.subject.Name }}</li>
          </ul>
        </div>
      </div>
      <TheTimer />
      <button
        @click="answerSwitch"
        class="bg-black text-lg text-white rounded-xl py-2 shadow-lg/30 hover:cursor-pointer"
        >
          Ver gabarito
        </button>
    </div>
    <ul class="grid gap-4 col-span-2 text-black"></ul>
  </main>
</template>

<style scoped>
.grid-template-questions {
    grid-template-columns: calc(var(--spacing) * 200) 1fr;
  }
</style>
