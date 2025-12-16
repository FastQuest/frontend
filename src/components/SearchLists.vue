<script setup lang="ts">
import QuestionsNav from '@/components/QuestionsNav.vue'
import type { List } from '@/models/List';
import type { Pagination } from '@/models/Pagination';
import { questionSetRepository } from '@/repositories/questionSetRepository';
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute();
const router = useRouter();

const lists = ref<List[] | null>(null)
const pagination = ref<Pagination>()
const fetchError = ref<unknown | undefined>()

const limitChars = (text: string, max = 300): string => {
  return text.length <= max ? text : text.slice(0, max) + '…';
};


function debounce<T extends (...args: any[]) => void>(fn: T, delay: number) {
  let timeoutId: ReturnType<typeof setTimeout> | null = null
  return (...args: Parameters<T>) => {
    if (timeoutId) clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn(...args), delay)
  }
}

const fetchLists = async () => {
  const { data, error } = await questionSetRepository.getLists({
    ...route.query,
    perPage: 10,
    include: ["user"]
  })

  if (!data) {
    fetchError.value = error
    return
  }


  pagination.value = data.pagination
  console.log(data)

  lists.value = data.items.map(l => {
    if (l.description == "" ) {
      l.description = "Sem descrição"
    } else {
        l.description = limitChars(l.description, 250)
    }
    return l
  })
}

const debouncedFetch = debounce(fetchLists, 300)

const goToList = (id: number) => {
  if (!addTolist.value) router.push('/lists/' + id)
}

const addTolist = ref<boolean>(false);

onMounted(async () => {
  await fetchLists()
});

watch(() => route.fullPath, () => {
  debouncedFetch();
})
</script>

<template>
  <div class="flex flex-col justify-between">
    <ul v-if="lists" class="grid grid-rows-10 gap-5">
      <li
        v-for="list in lists"
        :key="list.id"
        class="bg-[#FAFAFA] shadow-lg/30 flex items-center w-full gap-5 p-5 rounded-2xl hover:cursor-pointer relative"
        @click="goToList(list.id!)"
      >
        <img class="h-28" src="/public/imgs/list/list_file_1.png" alt="">
        <div class="text-black text-lg h-full w-full">
          <h1>{{ list.name }}</h1>
          <span class="block rounded w-full h-[1px] bg-gray-200"></span>
          <p class="font-light">{{ list.description }}</p>
        </div>
      </li>
      <li v-if="lists.length < 1" class="flex items-center justify-center h-40">
        <p v-if="fetchError" class="text-gray-700 text-center text-lg">Error ao carregar questões.</p>
        <p v-else class="text-gray-700 text-center text-lg">Nenhuma questão encontrada.</p>
      </li>
    </ul>

    <div v-else class="h-full w-full flex justify-center items-center flex-col text-black">
      <p>Carregando questões...</p>
    </div>

    <QuestionsNav :pagination="pagination!" v-if="(pagination?.last_page ?? 0) > 1"/>
  </div>
</template>

<style scoped>
a {
  font-weight: 300;
  line-height: 1;
}

.bg-header {
  background: linear-gradient(180deg, #6686AF 0%, #1D3F69 100%);
}
</style>
