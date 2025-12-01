<script setup lang="ts">
import TheCard from './TheCard.vue';

const props = defineProps<{
  grade?: {
    hits: number
    total: number
  }
}>()
</script>

<template>
  <TheCard title="Seu Último Resultado" class="text-black w-92" inside-class="justify-between h-full" inside-pd="md">
    <div class="flex flex-col justify-center">
      <h2>Você acertou:</h2>
      <span class="flex justify-center items-center text-3xl h-22 rounded-xl w-full bg-white shadow-lg/20">
        <p v-if="grade">{{ grade.hits }} / {{ grade.total }}</p>
        <img v-else class="h-8" src="/public/imgs/lock.svg" alt="">
      </span>
    </div>
    <p v-if="grade" class="font-light">Veja um resumo do seu desempenho e explore os detalhes de cada questão para entender melhor seus acertos e pontos a melhorar. </p>
    <p v-else class="font-light">Aqui vai aparecer um resumo do seu desempenho e onde você poderá explorar os detalhes de cada questão para entender melhor seus acertos e pontos a melhorar.</p>
  </TheCard>
</template>
