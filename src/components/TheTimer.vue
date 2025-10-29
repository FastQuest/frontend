<script lang="ts" setup>
import { useStopwatch } from '@/composables/timer.ts'
const { formattedTime, start, pause, reset } = useStopwatch()
</script>

<template>
  <div class="flex flex-col items-center bg-[#FAFAFA] shadow-lg/30 p-3 rounded-2xl">
    <div class="flex gap-1 text-black leading-none text-3xl">
        <span class="pt-1">{{ formattedTime() }}</span>
    </div>
    <div class="flex gap-3">
      <button @click="pause" class="flex justify-center item hover:cursor-pointer"><img class="h-5" src="/public/imgs/stop.svg" alt=""></button>
      <button @click="start" class="flex justify-center item hover:cursor-pointer"><img class="h-5" src="/public/imgs/play.svg" alt=""></button>
      <button @click="reset" class="flex justify-center item hover:cursor-pointer"><img class="h-5" src="/public/imgs/redo.svg" alt=""></button>
    </div>
  </div>
</template>
