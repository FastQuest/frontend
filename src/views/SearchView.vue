<script setup lang="ts">
import SearchBar from '@/components/SearchBar.vue'
import ActionBtns from '@/components/ActionBtns.vue'
import SearchQuestions from '@/components/SearchQuestions.vue'
import TheFilter from '@/components/TheFilter.vue'
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
  <main class="flex w-full p-16 gap-16">
    <section class="flex  flex-col flex-1 gap-16">
      <SearchBar/>
      <SearchQuestions />
    </section>
    <TheFilter />
  </main>
</template>
