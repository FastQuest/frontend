<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

const modules = [Navigation, Pagination, Scrollbar, A11y]
</script>

<template>
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
            <img :class="['w-4/6 transition-all duration-300 select-none', isNext ? 'w-5/6' : '']" src="/imgs/list/list_file_1.png" alt="">
            <p class="absolute bottom-1/12 text-2xl text-black" v-if="isNext">Pasta</p>
        </div>
      </SwiperSlide>
    </Swiper>
</template>