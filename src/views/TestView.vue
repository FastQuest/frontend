<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules'
import { useNotification } from '@/composables/notification';

const { notify } = useNotification()

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

const modules = [Navigation, Pagination, Scrollbar, A11y]

import { ref } from 'vue'
import { API_BASE_URL } from '@/config/api'

const userInput = ref<string>("")
const locked = ref<boolean>(false)

const sendGenIA = async (text: string) => {
    try {
      const res = await fetch(`${API_BASE_URL}/ai/gen-questionset`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({text: text})
      })
      if (!res.ok) {
          locked.value = true
          notify("Falha ao criar pasta.")
          throw new Error(`Erro ao buscar listas: ${res.status}`)
      }
      notify("Pasta criada com sucesso!")
      locked.value = false

    } catch (err: unknown) {
      return { error: err instanceof Error ? err.message : String(err) }
    }
  }

const createQuestionSet = () => {
    if (locked.value) {
      notify("Sua pasta está sendo criada, aguarde.")
      return
    }
    locked.value = true
    sendGenIA(userInput.value)
    notify("Sua pasta está sendo criada.")
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
    <div class="h-[80vh] flex flex-col justify-center items-center gap-32">
      <div class="flex">
        <input v-model="userInput" type="text" class="w-[50vw] border-2 border-black text-black px-2">
        <button @click="createQuestionSet" class="hover:cursor-pointer bg-black text-white px-5 py-3 rounded-r-lg shadow-lg">Criar Pasta</button>
      </div>
    </div>
  </main>
</template>
