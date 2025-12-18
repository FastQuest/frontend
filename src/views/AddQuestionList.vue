<script setup lang="ts">
import SearchBar from '@/components/SearchBar.vue'
import SearchQuestions from '@/components/SearchQuestions.vue'
import TheFilter from '@/components/TheFilter.vue'
import { useRoute, useRouter } from 'vue-router'
import { onMounted } from 'vue'

const route = useRoute()
const router = useRouter()

onMounted(() => {
  if (!route.query.page) {
    router.push({
      query: {
        page: 1,
      }
    })
  }

  const stored = localStorage.getItem('newListData');

  if (!stored) router.replace('/list/new');
})
</script>



<template>
  <main class="flex w-full p-16 gap-16 relative overflow-hidden">
    <img class="absolute -mx-16 h-full -z-10" src="/public/imgs/questions/bg-1.svg" alt="">
    <img class="absolute right-0 -mx-16 h-full -z-10" src="/public/imgs/questions/bg-2.svg" alt="">
    <section class="flex flex-col flex-1 gap-10">
      <div class="flex items-center gap-3">
        <button
          class="text-white text-lg rounded-lg hover:cursor-pointer"
          @click="() => router.replace({ path: '/create', hash: '#new-questionset' })"
        >
          <img class="h-14" src="/public/imgs/arrow2.svg" alt="">
        </button>
        <SearchBar class="w-full"/>
      </div>
      <SearchQuestions />
    </section>
    <TheFilter type="question" />
  </main>
</template>
