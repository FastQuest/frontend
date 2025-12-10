<script setup lang="ts">
import QuestionsNav from '@/components/QuestionsNav.vue'
import { API_BASE_URL } from '@/config/api';
import type { NewList } from '@/models/NewList';
import type { List } from '@/models/List';
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute();
const router = useRouter();

interface Pagination {
  current_page: number
  last_page: number
  per_page: number
  total: number
}

interface ListResponse {
  data: List[]
  pagination: Pagination
}

const lists = ref<ListResponse | null>(null)

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

  const query = new URLSearchParams({
    ...route.query,
    limit: "10",
    detail: "information"
  });

  try {
    const res = await fetch(`${API_BASE_URL}/question-sets?${query}`)
    const data = await res.json() as ListResponse

    data.data.forEach(e => {
      if (e.description == "") {
        e.description = "Sem descrição"
      } else {
        e.description = limitChars(e.description, 250)
      }
    })

    lists.value = data
  } catch (err) {
    console.error('Erro ao buscar questões:', err)
  }
}

const debouncedFetch = debounce(fetchLists, 300)

const goToList = (id: number) => {
  if (!addTolist.value) router.push('/lists/' + id)
}

const addTolist = ref<boolean>(false);

const newListData = ref<NewList>({
  name: "",
  type: "list",
  desc: "",
  is_private: false,
  user_id: 1,
  questions: []
})

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
        v-for="list in lists.data"
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
      <li v-if="lists.data.length < 1" class="h-40"></li>
    </ul>

    <div v-else class="h-full w-full flex justify-center items-center flex-col text-black">
      <p>Carregando questões...</p>
    </div>

    <QuestionsNav :pagination="lists?.pagination!" v-if="lists?.pagination.total != 1"/>
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
