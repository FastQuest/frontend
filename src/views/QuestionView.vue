<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { DetailQuestion } from '@/models/DetailQuestion.ts';
import { questionRepository } from '@/repositories/questionRepository';
import TheTimer from '@/components/TheTimer.vue';

const route = useRoute()
const router = useRouter()
const question = ref<DetailQuestion | undefined>(undefined)
const showCorrect = ref(false);

const answerSwitch = () => {
  showCorrect.value = !showCorrect.value
  console.log(showCorrect.value)
}

const questionText = computed((): string => {
  if (!question.value) return ''
  return `${question.value.statement}\n\n` +
    question.value.answers.map(a => a.Text).join('\n\n')
})

const selectionState = computed(() => {
  return question.value?.answers.reduce((acc, a) => {
    const isSelected = selectedAnswer.value === a.ID
    const isCorrect = a.Is_correct
    let border = "none"

    if (isSelected && !showCorrect.value) border = "selected"
    else if (isSelected && showCorrect.value && !isCorrect) border = "wrong"
    else if (showCorrect.value && isCorrect) border = "correct"

    acc[a.ID] = border
    return acc
  }, {} as Record<number, string>)
})


const loadQuestion = async (id: number) => {
  const { data } = await questionRepository.getQuestionDetail(id)

  if (!data) {
    router.push("/error");
  }

  question.value = data
}

const selectedAnswer = ref<number | null>(null)

const selectAnswer = (id: number) => {
  if (showCorrect.value) return
  selectedAnswer.value = id
}

onMounted( async () => {
  await loadQuestion(Number(route.params.id))
})

watch(() => route.params.id, (newId, oldId) => {
  if (newId && newId !== oldId) loadQuestion(Number(newId))
})
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
    <ul class="grid gap-4 col-span-2 text-black">
      <li
        :class="[
          'flex items-center gap-5 bg-[#FAFAFA] rounded-2xl p-6 shadow-lg/30 border-4',
          {selected: 'border-black', wrong: 'border-[#AA4243]', correct: 'border-[#1D3F69]', none: 'border-[#FAFAFA]'}[selectionState![value.ID]],
          !showCorrect ? 'hover:cursor-pointer' : ''
        ]"
        v-for="(value, i) in question?.answers"
        :key="i"
        @click="selectAnswer(value.ID)">

        <img
          v-if="selectionState![value.ID] === 'correct' || selectionState![value.ID] === 'wrong'"
          :class="[
            'h-10 aspect-square p-1 rounded-lg aura',
            {wrong: 'bg-[#AA4243]', correct: 'bg-[#1D3F69]'}[selectionState![value.ID]]
          ]"
          :src="'/public/imgs/' + {wrong: 'x.svg', correct: 'check.svg'}[selectionState![value.ID]]" alt="">
        <span
          v-else
          class="flex justify-center items-center text-2xl border-black border-2 aspect-square h-10 leading-0 pt-1 rounded-lg aura"
        >
          {{ ["A", "B", "C", "D"][i] }}
        </span>
        <p class="font-light text-lg"> {{ value.Text }} </p>
      </li>
    </ul>
  </main>
</template>

<style scoped>
  .grid-template-questions {
    grid-template-columns: 3fr minmax(calc(var(--spacing) * 80), 1fr);
  }

  .aura {
    box-shadow: 0px 0px 3px 0px rgba(0,0,0,1);
    -webkit-box-shadow: 0px 0px 3px 0px rgba(0,0,0,1);
    -moz-box-shadow: 0px 0px 3px 0px rgba(0,0,0,1);
  }

  .aura-correct {
    box-shadow: 0px 0px 3px 0px rgba(29,69,105,1);
    -webkit-box-shadow: 0px 0px 3px 0px rgba(29,69,105,1);
    -moz-box-shadow: 0px 0px 3px 0px rgba(29,69,105,1);
  }
</style>
