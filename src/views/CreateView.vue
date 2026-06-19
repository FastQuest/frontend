<script setup lang="ts">
import NewQuestionSet from '@/components/NewQuestionSet.vue';
import { onMounted } from 'vue';



</script>

<template>
  <section class="flex justify-between bg-black text-white gap-5 my-10 h-[70vh]">
    <div class="flex flex-col gap-10 w-1/2 h-full justify-center mx-10">
      <h1 class="text-5xl">Dê Voz às Suas Ideias!</h1>
      <p class="text-2xl">Selecione abaixo se deseja criar um novo questionário completo ou adicionar uma questão individual. Você poderá personalizar os detalhes após sua escolha.</p>
      <div class="text-xl flex w-full  gap-6">
        <button class="bg-[#AA4243] flex-1 py-2 rounded hover:cursor-pointer">Criar Questionário</button>
        <button class="bg-[#1D3F69] flex-1 py-2 rounded hover:cursor-pointer hidden">Criar Pergunta</button>
      </div>
    </div>
    <img class="h-full" src="/imgs/create/background.png" alt="">
  </section>
  <NewQuestionSet />
</template>
