<script setup lang="ts">
import SearchBar from '@/components/SearchBar.vue'
import SearchLists from '@/components/SearchLists.vue'
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
  <main class="flex w-full p-16 gap-16 relative overflow-hidden">
    <img class="absolute -mx-16 h-full -z-10" src="/public/imgs/questions/bg-1.svg" alt="">
    <img class="absolute right-0 -mx-16 h-full -z-10" src="/public/imgs/questions/bg-2.svg" alt="">
    <section class="flex flex-col flex-1 gap-10">
      <SearchBar placeholder="Pesquise pastas..."/>
      <SearchLists />
    </section>
    <TheFilter type="list" />
  </main>
</template>

<style scoped>
</style>
