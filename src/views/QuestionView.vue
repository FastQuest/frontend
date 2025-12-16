<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { questionRepository } from '@/repositories/questionRepository';
import TheTimer from '@/components/TheTimer.vue';
import TheAnswers from '@/components/TheAnswers.vue';
import { type Question } from '@/models/Question';

const route = useRoute()
const router = useRouter()
const question = ref<Question | undefined>(undefined)
const showCorrect = ref(false);
const selectedAnswer = ref<{letter: string, answerId: number} | null>(null)

const answerSwitch = () => {
  showCorrect.value = !showCorrect.value
}

const loadQuestion = async (id: number) => {
  const { data } = await questionRepository.getQuestion(id, ["user","subject","answers"])

  if (!data) {
    router.push("/error?code=QID404");
  } else {
    question.value = data
  }

}

onMounted( async () => {
  await loadQuestion(Number(route.params.id))
})

watch(() => route.params.id, (newId, oldId) => {
  if (newId && newId !== oldId) loadQuestion(Number(newId))
})
</script>

<template>
  <main v-if="question" class="grid grid-template-questions auto-rows-min p-16 gap-10">
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
            <li><b>Criador:</b> {{ question?.user?.name }}</li>
            <li><b>Data:</b> {{ question?.createdAt.slice(0, 4) }}</li>
            <li><b>Disciplina:</b> {{ question?.subject?.name }}</li>
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
    <TheAnswers :answers="question?.answers ?? []" :showCorrect v-model:selectedAnswer="selectedAnswer"/>
  </main>
</template>

<style scoped>
  .grid-template-questions {
    grid-template-columns: 3fr minmax(calc(var(--spacing) * 80), 1fr);
  }
</style>
