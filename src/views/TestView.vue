<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

const modules = [Navigation, Pagination, Scrollbar, A11y]

import { GoogleGenAI } from "@google/genai";
import { ref } from 'vue'

const aitext = ref<String>("")

const ai = new GoogleGenAI({
  apiKey: "AIzaSyDbo4lNZ2E4LoQQLArhe-xNJsP_GWW-f7g", // ⚠️ nunca use isso em produção
});

async function askAI() {
  console.log("gerando...")
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: "O que é minecraft?",
  });
  
  aitext.value = response.candidates[0].content?.parts?[0]
}
</script>

<template>
  <main class="flex flex-col">
    <div class="h-[80vh] text-black">
      <Swiper
        :modules="modules"
        :slides-per-view="3"
        :space-between="50"
        navigation
        :pagination="{ clickable: true }"
        :scrollbar="{ draggable: true }"
        class="h-full"
      >
        <SwiperSlide v-slot="{ isNext }" v-for="n in 10" :key="n">
          <div class="h-full w-full flex justify-center items-center flex-col relative">
              <img :class="['w-1/2 transition-all duration-300 select-none', isNext ? 'w-5/6' : '']" src="/imgs/list/list_file_1.png" alt="">
              <p class="absolute bottom-1/12 text-2xl" v-if="isNext">Pasta</p>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
    <div class="h-[80vh] flex justify-center items-center">
      <button @click="askAI" class="bg-black text-white px-5 py-3 rounded-lg shadow-lg">Chamar Gemini</button>
    </div>
  </main>
</template>
