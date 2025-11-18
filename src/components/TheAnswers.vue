<script setup lang="ts">
import type { Answer } from '@/models/Question';
import { computed } from 'vue';

const props = defineProps<{
  answers: Answer[],
  showCorrect: boolean,
  selectedAnswer: number | null
}>()

const emit = defineEmits(["update:selectedAnswer", "selectAnswer"])

const selectAnswer = (id: number) => {
  if (props.showCorrect) return
  emit('update:selectedAnswer', id)
  emit('selectAnswer')
}

const selectionState = computed(() => {
  return props.answers.reduce((acc, a) => {
    const isSelected = props.selectedAnswer === a.ID
    const isCorrect = a.Is_correct
    let border = "none"

    if (isSelected && !props.showCorrect) border = "selected"
    else if (isSelected && props.showCorrect && !isCorrect) border = "wrong"
    else if (props.showCorrect && isCorrect) border = "correct"

    acc[a.ID] = border
    return acc
  }, {} as Record<number, string>)
})
</script>

<template>
  <ul class="grid gap-4 col-span-2 text-black">
    <li
      :class="[
        'flex items-center gap-5 bg-[#FAFAFA] rounded-2xl p-6 shadow-lg/30 border-4',
        {selected: 'border-black', wrong: 'border-[#AA4243]', correct: 'border-[#1D3F69]', none: 'border-[#FAFAFA]'}[selectionState[value.ID] || 'none'],
        !props.showCorrect ? 'hover:cursor-pointer' : ''
      ]"
      v-for="(value, i) in props.answers"
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
</template>
