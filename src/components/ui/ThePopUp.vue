<script setup lang="ts">
import { usePopUp } from '@/composables/popup';
import TheCard from './TheCard.vue';
import BaseButton from './BaseButton.vue';

const { isOpen, onConfirm, close } = usePopUp();
</script>

<template>
  <span v-if="isOpen" class="flex justify-center items-center fixed w-screen h-screen backdrop-blur-sm">
    <TheCard title="Aviso" inside-class="gap-8" inside-pd="md">
      <h1 class="text-black text-2xl">Deseja mesmo terminar a lista?</h1>
      <div class="flex gap-8">
        <BaseButton @click="onConfirm" class="py-3 w-full text-lg"> Terminar Lista </BaseButton>
        <BaseButton @click="close" class="py-3 w-full text-lg"> Voltar </BaseButton>
      </div>
    </TheCard>
  </span>
</template>
