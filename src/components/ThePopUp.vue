<script setup lang="ts">
import { usePopUp } from '@/composables/popup';
import TheCard from './TheCard.vue';

const { isOpen, onConfirm, close } = usePopUp();
</script>

<template>
  <span v-if="isOpen" class="flex justify-center items-center fixed w-screen h-screen backdrop-blur-sm">
    <TheCard title="Aviso" inside-class="gap-8" inside-pd="md">
      <h1 class="text-black text-2xl">Deseja mesmo terminar a lista?</h1>
      <div class="flex gap-8">
        <button @click="onConfirm" class="bg-black text-white py-3 w-full rounded-lg text-lg hover:cursor-pointer"> Terminar Lista </button>
        <button @click="close" class="bg-black text-white py-3 w-full rounded-lg text-lg hover:cursor-pointer"> Voltar </button>
      </div>
    </TheCard>
  </span>
</template>
