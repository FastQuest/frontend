<script setup lang="ts">
import SearchBar from '@/components/SearchBar.vue'
import SearchQuestions from '@/components/SearchQuestions.vue'
import TheFilter from '@/components/TheFilter.vue'
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref} from 'vue'
import type { NewList } from '@/models/NewList'

const route = useRoute()
const router = useRouter()

const addToList = ref<boolean>(false)
const newListData = ref<NewList>({
  name: "",
  type: "list",
  desc: "",
  is_private: false,
  user_id: 1,
  questions: []
})

onMounted(() => {
  if (!route.query.page) {
    router.push({
      query: {
        page: 1,
      }
    })
  }

  if (route.path === "/search/add-to-list") {
    addToList.value = true;

    const stored = localStorage.getItem('newListData');

    if (stored) {
      const parsed = JSON.parse(stored);
      Object.assign(newListData.value, parsed);
    } else {
      router.replace('/create-list');
    }
  }
})
</script>



<template>
  <main class="flex w-full p-16 gap-16 relative overflow-hidden">
    <img class="absolute -mx-16 h-full -z-10" src="/public/imgs/questions/bg-1.svg" alt="">
    <img class="absolute right-0 -mx-16 h-full -z-10" src="/public/imgs/questions/bg-2.svg" alt="">
    <section class="flex flex-col flex-1 gap-10">
      <SearchBar/>
      <SearchQuestions />
    </section>
    <TheFilter />
  </main>
</template>
