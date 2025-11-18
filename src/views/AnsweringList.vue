<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import type { DetailQuestion } from '@/models/DetailQuestion.ts';
import { API_BASE_URL } from '@/config/api';
import type { List } from '@/models/List';
import TheCard from '@/components/TheCard.vue';
import TheAnswers from '@/components/TheAnswers.vue';
import TheTimer from '@/components/TheTimer.vue';
import { questionRepository } from '@/repositories/questionRepository';
import { questionSetRepository } from '@/repositories/questionSetRepository';

const route = useRoute()
const question = ref<DetailQuestion | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)
const showCorrect = ref(false);

const list = ref<List | null>(null)

const fetchList = async (id: number) => {
  loading.value = true
  error.value = null

  const { data } = await questionSetRepository.getListById(id)
  list.value = data!
}

const questionIDs = ref<number[]>([])
const position = ref<number>(0)
const isLoading = ref(false)

async function fetchQuestionIDs(questionSetId: number) {
  isLoading.value = true
  error.value = null

  const { data } = await questionRepository.getQuestionsByQuestionSetId(questionSetId)
  questionIDs.value = data!
}

const answerSwitch = () => {
  showCorrect.value = !showCorrect.value
  console.log(showCorrect.value)
}

const fetchQuestion = async (id: number) => {
  loading.value = true
  error.value = null

  const { data }= await questionRepository.getQuestionDetail(id)
  question.value = data!

}

const userAnswers = ref<Record<number, number | null>>({});

const initializeAnswers = () => {
  const newAnswers: Record<number, number | null> = {};

  questionIDs.value.forEach((id) => {
    newAnswers[id] = userAnswers.value[id] || null;
  });

  userAnswers.value = newAnswers;
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
  await fetchList(Number(route.params.id));
  await fetchQuestionIDs(Number(route.params.id));

  initializeAnswers();

  if (questionIDs.value.length > 0) {
    console.log(questionIDs.value)
    await fetchQuestion(questionIDs.value[0]);
  }
});

watch(() => route.params.id, async (newId) => {
  await fetchList(Number(newId));
  await fetchQuestionIDs(Number(newId));
  if (questionIDs.value.length > 0) {
    position.value = 0;
    await fetchQuestion(questionIDs.value[0]);
  }
});
</script>

<template>
  <main class="flex flex-col w-full p-16 gap-8">
    <header class="w-full flex items-center justify-between">
      <div class="flex gap-3 h-full w-fit items-center">
        <h1 class="text-black text-2xl leading-none align-middle p-0 m-0 inline mt-1.5">{{ list?.name ?? 'Carregando...' }}</h1>
      </div>
    </header>
    <div class="flex gap-8">
      <TheCard class="flex-1" :title="'Questão #' + (position + 1)">
        <p class=" text-lg font-light text-black">{{ question?.statement }}</p>
      </TheCard>
      <div class="flex flex-col gap-8 min-w-92">
        <TheCard title="Informações">
          <ul class="text-base p-5 flex flex-col items-center gap-2 text-black">
            <li class="w-full">Criador: {{ question?.user?.name ?? 'indefinido'}}</li>
            <li class="w-full">Fonte: {{ question?.source?.Type ?? 'indefinido' }}</li>
            <li class="w-full">Data: {{ question?.source?.Metadata.year ?? 'indefinido' }}</li>
            <li class="w-full">Disciplina: {{ question?.subject?.Name ?? 'indefinido' }}</li>
          </ul>
        </TheCard>
        <TheTimer />
        <button @click="answerSwitch" :disabled="!allAnswered" class="bg-black text-white py-3 w-full rounded-lg text-lg hover:cursor-pointer">{{ showCorrect ? 'Esconder' : 'Ver Respostas' }}</button>
      </div>
    </div>

    <TheAnswers :answers="question?.answers" :show-correct="showCorrect" v-model:selected-answer="userAnswers[currentQuestionId]" />

    <div class="flex justify-between items-center h-10 mb-6">
      <button class="nav-arrow" @click="goToPrevious" :disabled="position === 0">
        <img class="rotate-90" src="/public/imgs/arrow.png" alt="">
      </button>
      <button class="nav-arrow" @click="goToNext" :disabled="position === questionIDs.length - 1">
        <img class="-rotate-90" src="/public/imgs/arrow.png" alt="">
      </button>
    </div>
  </main>
</template>

<style scoped>

.question-box {
  display: flex;
  flex-direction: column;
}

.gradient-border {
  border: 3px solid transparent;
  background: linear-gradient(white, white) padding-box, /* fundo do conteúdo */
              linear-gradient(180deg, #051427, #540D1B, #A74223) border-box; /* borda gradient */
}

.correct-gradient {
  background: linear-gradient(180deg, #1D3F69, #6686AF);
}

.wrong-gradient {
  background: linear-gradient(180deg, #AA4243, #540D1B);
}

.bg-topic {
  background: linear-gradient(
    90deg,
    #6686AF 0%,
    #1D3F69 100%
  );
}

.nav-arrow {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: auto;
  aspect-ratio: 1/1;
  border: none;
  border-radius: 15px;
  background: rgb(5, 20, 39);
  background: linear-gradient(
    180deg,
    rgba(5, 20, 39, 1) 0%,
    rgba(84, 13, 27, 1) 51%,
    rgba(167, 66, 35, 1) 100%
  );
}

.nav-arrow:hover {
  cursor: pointer;
}

.nav-arrow:disabled, button:disabled {
  cursor: not-allowed;
}
</style>
