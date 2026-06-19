<script setup lang="ts">
import SelectInput from '@/components/SelectInput.vue'
import { useRoute, useRouter } from 'vue-router'
import { ref, watch, onMounted } from 'vue' // Trocado computed por onMounted
import { buildListFilter, buildQuestionFilter } from '@/utils/filter';

const props = defineProps<{
  type: "question" | "list"
}>()

// 1. Tipagem para ajudar o TypeScript a entender a estrutura dos filtros
interface FilterOptions {
  order?: { label: string; value: string }[];
  source?: { label: string; value: string }[];
  date?: { label: string; value: string }[];
  subject?: { label: string; value: string }[];
}

// 2. Usamos ref em vez de computed, iniciando com arrays vazios
const availableFilters = ref<FilterOptions>({
  order: [],
  source: [],
  date: [],
  subject: []
})

// 3. Função assíncrona para buscar os filtros com base no tipo
const loadFilters = async () => {
  if (props.type === 'list') {
    availableFilters.value = await buildListFilter();
  } else {
    availableFilters.value = await buildQuestionFilter();
  }
}

// 4. Dispara a busca quando o componente é montado na tela
onMounted(() => {
  loadFilters();
})

// Garante que, se a prop 'type' mudar dinamicamente, os filtros recarreguem
watch(() => props.type, loadFilters);

const selectedInputs = ref<{[key: string]: string}>({
  orderBy: "",
  source: "",
  year: "",
  subject: ""
})

const route = useRoute();
const router = useRouter();

const setFilter = (item: {label: string, value: string}, query: string) => {
  router.push({
    query: {
      ...route.query,
      [query]: item.value
    }
  })
}

const resetQueries = () => {
  router.push({
    query: {}
  })
}

const syncFiltersFromRoute = () => {
  const query = route.query;

  for (const key in selectedInputs.value) {
    const value = query[key];
    selectedInputs.value[key] = typeof value === 'string' ? value : '';
  }
};

syncFiltersFromRoute();

watch(() => route.fullPath, syncFiltersFromRoute);
</script>

<template>
  <div class="bg-[#FAFAFA] shadow-2xl/30 overflow-hidden rounded-2xl gap-4 w-60 pb-4 transition-all duration-75 h-fit flex flex-col items-center">
    <header class="bg-black flex justify-center items-center h-14 w-full">
      <h2 class="text-white text-lg">FILTROS</h2>
    </header>
    <main class="flex flex-col items-center px-4 gap-6 w-full">
      <ul class="flex flex-col items-center gap-6 w-full">
        <SelectInput placeholder="Ordenar Por" :selects="availableFilters.order ?? []" @select="item => setFilter(item, 'orderBy')" :selectedValue="selectedInputs.orderBy"/>
        <SelectInput placeholder="Fonte" :selects="availableFilters.source ?? []" @select="item => setFilter(item, 'source')" :selectedValue="selectedInputs.source"/>
        <SelectInput placeholder="Data" :selects="availableFilters.date ?? []" @select="item => setFilter(item, 'year')" :selectedValue="selectedInputs.year"/>
        <SelectInput placeholder="Disciplina" :selects="availableFilters.subject ?? []" @select="item => setFilter(item, 'subject')" :selectedValue="selectedInputs.subject"/>
      </ul>
      <div class="flex items-center gap-2">
        <input class="h-6" type="checkbox" id="com_lista" name="com_lista" value="HTML">
        <label for="com_lista" class="text-black font-light">Incluir apenas questões <b>com</b> listas</label>
      </div>
      <div class="flex items-center gap-2">
        <input class="h-fit" type="checkbox" id="sem_lista" name="sem_lista" value="HTML">
        <label for="sem_lista" class="text-black font-light">Incluir apenas questões <b>sem</b> listas</label>
      </div>
      <button @click="resetQueries" class="bg-black text-white w-full rounded-lg font-normal text-base p-1 hover:cursor-pointer">Resetar Filtros</button>
    </main>
  </div>
</template>

<style scoped>
label {
  line-height: 1;
}
</style>