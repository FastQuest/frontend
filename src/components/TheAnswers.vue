<script setup lang="ts">
import type { QuestionOption } from '@/models/Question';
import { computed } from 'vue';

const props = defineProps<{
  answers: QuestionOption[],
  showCorrect: boolean,
  selectedAnswer: {letter: string, answerId: number} | null
}>()

console.log(props.answers)
console.log(props.showCorrect)
console.log(props.selectedAnswer)


const emit = defineEmits(["update:selectedAnswer", "selectAnswer"])

const selectAnswer = (id: number, index: number) => {
  if (props.showCorrect) return
  emit('update:selectedAnswer', {letter: ["A", "B", "C", "D"][index], answerId: id})
  emit('selectAnswer')
  console.log(props.selectedAnswer)
}

const selectionState = computed(() => {
  return props.answers.reduce((acc, a) => {
    const isSelected = props.selectedAnswer?.answerId === a.id
    const isCorrect = a.is_correct
    let border = "none"

    if (isSelected && !props.showCorrect) border = "selected"
    else if (isSelected && props.showCorrect && !isCorrect) border = "wrong"
    else if (props.showCorrect && isCorrect) border = "correct"

    acc[a.id] = border
    return acc
  }, {} as Record<number, string>)
})
</script>

<template>
  <ul class="grid gap-4 col-span-2 text-black">
    <li
      :class="[
        'flex items-center gap-5 bg-[#FAFAFA] rounded-2xl p-6 shadow-lg/30 border-4',
        {selected: 'border-black', wrong: 'border-[#AA4243]', correct: 'border-[#1D3F69]', none: 'border-[#FAFAFA]'}[selectionState[value.id] || 'none'],
        !props.showCorrect ? 'hover:cursor-pointer' : ''
      ]"
      v-for="(value, i) in props.answers"
      :key="i"
      @click="selectAnswer(value.id, i)">

      <img
        v-if="selectionState![value.id] === 'correct' || selectionState![value.id] === 'wrong'"
        :class="[
          'h-10 aspect-square p-1 rounded-lg aura',
          {wrong: 'bg-[#AA4243]', correct: 'bg-[#1D3F69]'}[selectionState![value.id]]
        ]"
        :src="'/public/imgs/' + {wrong: 'x.svg', correct: 'check.svg'}[selectionState![value.id]]" alt="">
      <span
        v-else
        class="flex justify-center items-center text-2xl border-black border-2 aspect-square h-10 leading-0 pt-1 rounded-lg aura"
      >
        {{ ["A", "B", "C", "D"][i] }}
      </span>
      <p class="font-light text-lg"> {{ value.text }} </p>
    </li>
  </ul>
</template>
