<script setup lang="ts">
import { useNotification } from '@/composables/notification';
import TheCard from './TheCard.vue';

const { message, closed } = useNotification()
</script>

<template>
  <TheCard
    id="card"
    title="Aviso"
    rounded="rounded-l"
    :class="['fixed bottom-10 right-0 transition-transform duration-200 ease-in-out min-w-96', !closed ? 'translate-x-0' : 'translate-x-full']"
  >
    <p class="text-black w-full text-center">{{ message }}</p>
  </TheCard>
</template>
