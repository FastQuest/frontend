<script setup lang="ts">
const props = defineProps<{
  title?: string
}>()
</script>

<template>
  <div class="bg-[#FAFAFA] overflow-hidden rounded-2xl flex flex-col shadow-lg/40">
    <h2 v-if="props.title" class="text-white bg-black p-4 text-lg text-center">{{ props.title }}</h2>
    <div class="w-full p-4 flex flex-col">
      <slot />
    </div>
  </div>
</template>
