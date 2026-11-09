<script setup lang="ts">
import SearchBar from '@/components/layout/SearchBar.vue'
import SearchLists from '@/components/layout/SearchLists.vue'
import TheFilter from '@/components/layout/TheFilter.vue'
import { useRoute, useRouter } from 'vue-router'
import { onMounted} from 'vue'

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
})
</script>



<template>
  <main class="page-gutter flex w-full min-h-screen py-16 gap-16 relative overflow-hidden">
    <img class="absolute -mx-[var(--page-gutter)] bottom-0 w-screen -z-10" src="/public/imgs/list/bg-1.svg" alt="">
    <section class="question-sets-content-enter flex flex-col flex-1 gap-10">
      <SearchBar placeholder="Pesquise pastas..."/>
      <SearchLists />
    </section>
    <TheFilter class="question-sets-filter-enter" type="list" />
  </main>
</template>

<style scoped>
.question-sets-content-enter {
  animation: question-sets-content-enter 520ms cubic-bezier(0.2, 0.7, 0.2, 1) both;
}

.question-sets-filter-enter {
  animation: question-sets-filter-enter 560ms cubic-bezier(0.2, 0.7, 0.2, 1) 100ms both;
}

@keyframes question-sets-content-enter {
  from {
    opacity: 0;
    transform: translateY(14px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes question-sets-filter-enter {
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
  .question-sets-content-enter,
  .question-sets-filter-enter {
    animation: none;
  }
}
</style>
