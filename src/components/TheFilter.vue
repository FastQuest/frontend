<script setup lang="ts">
import SelectInput from '@/components/SelectInput.vue'
import { useRoute, useRouter } from 'vue-router'
import { computed, ref, watch } from 'vue'
import { buildListFilter, buildQuestionFilter } from '@/utils/filter';

const props = defineProps<{
  type: "question" | "list"
}>()

const availableFilters = computed(() => {
  return props.type === 'list' ? buildListFilter() : buildQuestionFilter();
})

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
        <input class="h-6" type="checkbox" id="html" name="fav_language" value="HTML">
        <label for="html" class="text-black font-light">Incluir apenas questões <b>com</b> listas</label>
      </div>
      <div class="flex items-center gap-2">
        <input class="h-fit" type="checkbox" id="html" name="fav_language" value="HTML">
        <label for="html" class="text-black font-light">Incluir apenas questões <b>sem</b> listas</label>
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


