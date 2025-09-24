<script setup lang="ts">
import Home2SectionFiles from './Home2SectionFiles.vue';
</script>

<template>
    <section class="flex items-center flex-col w-screen py-20 px-5 lg:px-30 xl:px-60">
      <h1 class="text-5xl text-black font-light"><b>PASTAS</b> EM <b>DESTAQUE</b></h1>

      <div class="w-full h-[40vh] bg-[#F4F4F4] px-30 my-12 rounded-3xl">
        <Home2SectionFiles />
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
</template>