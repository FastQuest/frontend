<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

interface Pagination {
  current_page: number
  last_page: number
  per_page: number
  total: number
}

interface Props {
  pagination: Pagination
}

const props = defineProps<Props>()

const localPagination = ref<Pagination>({ ...props.pagination })

watch(() => props.pagination, (newVal) => {
  if (newVal) {
    localPagination.value = { ...newVal }
  }
}, { immediate: true })

const currentPage = computed(() => Number(localPagination.value.current_page) || 1)

const pagesToShow = computed(() => {
  const total = localPagination.value.last_page
  const current = currentPage.value
  const delta = 1
  const range = []

  for (let i = Math.max(2, current - delta); i <= Math.min(total - 1, current + delta); i++) {
    range.push(i)
  }

  const showLeftDots = current - delta > 2
  const showRightDots = current + delta < total - 1

  const pages: (number | string)[] = [1]

  if (showLeftDots) pages.push('...')
  pages.push(...range)
  if (showRightDots) pages.push('...')
  if (total > 1) pages.push(total)

  return pages
})

const route = useRoute();
const router = useRouter();

function goToPage(page: number) {
  router.push({
    query: {
      ...route.query,
      page: page
    }
  })
}

function goToPreviousPage() {
  goToPage(currentPage.value - 1)
}

function goToNextPage() {
  goToPage(currentPage.value + 1)
}
</script>


<template>
  <div class="h-14 py-2 flex justify-between items-center">
      <button
        @click="goToPreviousPage"
        :class="['bg-black flex p-1 rounded-xl h-full hover:cursor-pointer', currentPage > 1  ? 'visible' : 'invisible']"
      >
        <img class="h-full rotate-90" src="/public/imgs/arrow.png" alt="">
      </button>

      <ul class="flex items-center gap-1 h-full">
        <li
          v-for="(num, idx) in pagesToShow"
          :key="idx"
          class="h-full flex justify-center items-center"
        >
          <span
            v-if="num === '...'"
            class="px-2 text-gray-500"
          >...</span>
          <button
            v-else
            @click="goToPage(Number(num))"
            :class="[
              'flex justify-center items-center p-0.5 h-5/6 text-shadow-lg px-3 rounded-xl leading-0 hover:cursor-pointer',
              currentPage === num ? 'bg-black text-white' : 'bg-white text-black'
            ]"
          >
            {{ num }}
          </button>
        </li>
      </ul>

      <button
        @click="goToNextPage"
        :class="['bg-black flex p-1 rounded-xl h-full hover:cursor-pointer', currentPage >= localPagination.last_page ? 'invisible' : 'visible']"
      >
        <img class="h-full -rotate-90" src="/public/imgs/arrow.png" alt="">
      </button>
    </div>
</template>
