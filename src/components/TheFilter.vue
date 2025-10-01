<script setup lang="ts">
import SelectInput from '@/components/SelectInput.vue'
import MultSelect from '@/components/MultSelect.vue'
import { useRoute, useRouter } from 'vue-router'
import { ref, watch } from 'vue'

const selectValues = {
  order: [
    { label: 'A - Z', value: 'statement asc' },
    { label: 'Z - A', value: 'statement desc' },
    { label: 'Recentes', value: 'created_at desc' },
    { label: 'Mais Antigos', value: 'created_at asc' },
    { label: 'Atualizados Recentemente', value: 'updated_at desc' },
    { label: 'Menos Recentemente Atualizados', value: 'updated_at asc' },
    { label: 'ID Crescente', value: 'id asc' },
    { label: 'ID Decrescente', value: 'id desc' }
  ],
  source: [
    {label: 'OAB Exame 42º', value: '2'},
    {label: 'OAB Exame 39º', value: '1'}
  ],
  date: [
    {label: '2025', value: '2025'},
    {label: '2024', value: '2024'},
    {label: '2023', value: '2023'}
  ],
  subject: [
    { label: 'Direito Constitucional', value: '1' },
    { label: 'Direito Penal', value: '2' },
    { label: 'Direito Civil', value: '3' },
    { label: 'Direito Administrativo', value: '4' },
    { label: 'Direito do Trabalho', value: '5' },
    { label: 'Direito Tributário', value: '6' }
  ]
}

const selectedInputs = ref<{[key: string]: string}>({
  order_by: "",
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
  <div class="bg-[#FAFAFA] shadow-2xl/30 overflow-hidden rounded-2xl gap-4 pb-4 w-[15vw] transition-all duration-75 h-fit flex flex-col items-center">
    <header class="bg-black flex justify-center items-center h-14 w-full">
      <h2 class="text-white text-lg">FILTROS</h2>
    </header>
    <main class="flex flex-col items-center px-4 gap-6 w-full">
      <ul class="flex flex-col items-center gap-6 w-full">
        <SelectInput placeholder="Ordenar Por" :selects="selectValues.order" @select="item => setFilter(item, 'order_by')" :selectedValue="selectedInputs.order_by"/>
        <SelectInput placeholder="Fonte" :selects="selectValues.source" @select="item => setFilter(item, 'source')" :selectedValue="selectedInputs.source"/>
        <SelectInput placeholder="Data" :selects="selectValues.date" @select="item => setFilter(item, 'year')" :selectedValue="selectedInputs.year"/>
        <SelectInput placeholder="Disciplina" :selects="selectValues.subject" @select="item => setFilter(item, 'subject')" :selectedValue="selectedInputs.subject"/>
      </ul>
  
      <MultSelect />
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


