<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  title?: string,
  rounded?: string,
  insideClass?: string,
  insidePd?: "sm" | "md" | "lg"
}>()

const padding = ref({
  sm: "p-4",
  md: "p-8",
  lg: "p-16"
})
</script>

<template>
  <div :class="['bg-[#FAFAFA] overflow-hidden flex flex-col shadow-lg/40', rounded ? rounded : 'rounded-2xl']">
    <h2 v-if="props.title" class="text-white bg-black p-4 text-lg text-center">{{ props.title }}</h2>
    <div
      :class="[
        'w-full flex flex-col',
        insideClass,
        padding[insidePd ? insidePd : 'sm']
      ]
    ">
      <slot />
    </div>
  </div>
</template>
