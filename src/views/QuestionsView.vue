<script setup lang="ts">
import SearchBar from '@/components/layout/SearchBar.vue'
import SearchQuestions from '@/components/questions/SearchQuestions.vue'
import TheFilter from '@/components/layout/TheFilter.vue'
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref} from 'vue'
import type { NewList } from '@/models/NewList'

const route = useRoute()
const router = useRouter()

const addToList = ref<boolean>(false)
const newListData = ref<NewList>({
  name: "",
  type: "list",
  description: "",
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
  <main class="page-gutter flex w-full py-16 min-h-screen gap-16 relative overflow-hidden">
    <img class="absolute -mx-[var(--page-gutter)] h-full -z-10" src="/public/imgs/questions/bg-1.svg" alt="">
    <img class="absolute right-0 -mx-[var(--page-gutter)] h-full -z-10" src="/public/imgs/questions/bg-2.svg" alt="">
    <section class="questions-content-enter flex flex-col flex-1 gap-10">
      <SearchBar placeholder="Pesquise perguntas..."/>
      <SearchQuestions />
    </section>
    <TheFilter class="questions-filter-enter" type="question"/>
  </main>
</template>

<style scoped>
.questions-content-enter {
  animation: questions-content-enter 520ms cubic-bezier(0.2, 0.7, 0.2, 1) both;
}

.questions-filter-enter {
  animation: questions-filter-enter 560ms cubic-bezier(0.2, 0.7, 0.2, 1) 100ms both;
}

@keyframes questions-content-enter {
  from {
    opacity: 0;
    transform: translateY(14px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes questions-filter-enter {
  from {
    opacity: 0;
    transform: translateY(14px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .questions-content-enter,
  .questions-filter-enter {
    animation: none;
  }
}
</style>
