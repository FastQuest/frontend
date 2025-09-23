<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
</script>

<template>
  <section class="flex flex-col h-[90vh] w-full">
      <header class="bg-black flex justify-between items-center w-full h-[12vh] px-6 md:px-12 select-none">
        <img class="w-24 h-fit" src="/public/imgs/logo.png" alt="">
        <ul class="text-white text-xl font-normal gap-6 hidden sm:flex">
          <li class="hover:cursor-pointer">Home</li>
          <li class="hover:cursor-pointer">Questões</li>
          <li class="hover:cursor-pointer">Pastas</li>
          <li class="hover:cursor-pointer">Criar</li>
        </ul>
        <img src="/public/imgs/icon_menu.svg" class="h-3/6 sm:hidden"/>
      </header>
      <main class="flex-1 bg-[url('/public/imgs/home/bg-home.png')] bg-cover flex items-center px-16">
        <p class="text-black text-6xl lg:w-2/3 font-light text-end md:text-start">
          <b>PREPARE-SE</b> PARA OS <b>DESAFIOS</b> QUE EXIGEM O <b>MELHOR DE VOCÊ</b>
        </p>
      </main>
      <footer class="flex justify-center py-6 px-2 h-fit w-full bg-black text-white text-xl leading-0.5 overflow-hidden gap-3 select-none">
        <ul v-for="n in 3" id="scroll" class="flex w-fit gap-3" :key="n">
          <li>FLASHQUEST</li>
          <li>-</li>
          <li>FLASHQUEST</li>
          <li>-</li>
          <li>FLASHQUEST</li>
          <li>-</li>
          <li>FLASHQUEST</li>
          <li>-</li>
          <li>FLASHQUEST</li>
          <li>-</li>
          <li>FLASHQUEST</li>
          <li>-</li>
          <li>FLASHQUEST</li>
          <li>-</li>
          <li>FLASHQUEST</li>
          <li>-</li>
          <li>FLASHQUEST</li>
          <li>-</li>
          <li>FLASHQUEST</li>
          <li>-</li>
        </ul>
      </footer>
  </section>
  <section class="flex items-center flex-col w-screen py-20 px-5 md:px-60">
    <h1 class="text-5xl text-black font-light"><b>PASTAS</b> EM <b>DESTAQUE</b></h1>

    <div class="flex justify-center w-full bg-[#F4F4F4] my-12 py-12 rounded-3xl gap-10">
      <button class="hover:cursor-pointer">
        <img class="invert rotate-90 w-[8vh]" src="/public/imgs/arrow.png" alt="">
      </button>
      <ul class="flex items-center gap-16">
        <li class="flex flex-col items-center text-black text-xl gap-3 drop-shadow-xl">
          <img class="w-[22vh]" src="/public/imgs/list/list_file_2.png" alt="">
        </li>
        <li class="flex flex-col items-center text-black text-xl gap-3 drop-shadow-xl">
          <img class="w-[25vh]" src="/public/imgs/list/list_file_1.png" alt="">
          <h3>Folder Name</h3>
        </li>
        <li class="flex flex-col items-center text-black text-xl gap-3 drop-shadow-xl">
          <img class="w-[22vh]" src="/public/imgs/list/list_file_3.png" alt="">
        </li>
      </ul>
      <button class="hover:cursor-pointer">
        <img class="invert -rotate-90 w-[8vh]" src="/public/imgs/arrow.png" alt="">
      </button>
    </div>

    <div class="lg:columns-2 text-black font-light text-xl text-justify gap-10">
      <p>Preparar-se para o exame da OAB exige dedicação, prática e estratégia. Aqui no  FastQuest, oferecemos uma ampla variedade de questionários e perguntas atualizadas, especialmente elaboradas para ajudar você a dominar os conteúdos mais cobrados na prova.</p>
      <br>
      <p>Nosso objetivo é facilitar seu aprendizado por meio de exercícios práticos que simulam o formato real do exame, permitindo que você teste seus conhecimentos, identifique seus pontos fortes e foque naquilo que precisa melhorar. </p>
      <p>Explore diferentes áreas do Direito, resolva questões em seu próprio ritmo e acompanhe seu progresso com nossos recursos exclusivos. Com o  FastQuest, estudar para a OAB fica mais eficiente, prático e motivador.</p>
      <br>
      <p>Comece agora mesmo e dê o passo decisivo para conquistar sua aprovação!</p>
    </div>
  </section>
  <section>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 861" fill="none">
      <path d="M-22.9871 861L1923.62 861C1923.62 861 2749.04 -46.6166 1782.57 93.7783C816.099 234.173 546.292 525.499 -22.9871 93.7783C-592.266 -337.943 -22.9871 861 -22.9871 861Z" fill="#540D1B"/>
    </svg>
  </section>
  <footer class="bg-black flex justify-center items-end h-[15vh]">
    <img class="h-[10vh]" src="/public/imgs/flashquest_logo.png" alt="">
  </footer>
</template>

<style>
#app {
  display: flex;
  overflow-x: hidden;
  flex-direction: column;
}

#scroll {
  --gap: calc(var(--spacing) * 3);
  animation: scroll 20s linear infinite
}

@keyframes scroll {
  to {
    transform: translateX(calc(-100% - var(--gap)));
  }
}
</style>
