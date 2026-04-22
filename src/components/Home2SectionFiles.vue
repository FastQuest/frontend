<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

const modules = [Navigation, Pagination, Scrollbar, A11y]

const swiperBreakpoints = {
  // Telas muito pequenas (padrão / mobile)
  0: {
    slidesPerView: 3,
    spaceBetween: 10,
  },
  // Quando a tela for >= 768px (equivalente ao md: do Tailwind)
  768: {
    slidesPerView: 3,
    spaceBetween: 30,
  },
  // Quando a tela for >= 1024px (equivalente ao lg: do Tailwind)
  1024: {
    slidesPerView: 3,
    spaceBetween: 50,
  }
};

</script>

<template>
    <Swiper
      :modules="modules"
      :breakpoints="swiperBreakpoints"
      navigation
      :pagination="{ clickable: true }"
      class="h-full"
    >
      <SwiperSlide v-slot="{ isNext }" v-for="n in 10" :key="n">
        <div class="h-full w-full flex justify-center items-center flex-col relative">
            <img :class="['w-5/6 transition-all duration-300 select-none', isNext ? 'w-full' : '']" src="/imgs/list/list_file_1.png" alt="">
            <p class="absolute bottom-1/12 text-2xl text-black" v-if="isNext">Pasta</p>
        </div>
      </SwiperSlide>
    </Swiper>
</template>
