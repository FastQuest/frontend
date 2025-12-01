<script setup lang="ts">
import { onMounted, ref} from 'vue'
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';

const props = defineProps({
  placeholder: String
})

const inputText = ref<string>('')
const route = useRoute();
const router = useRouter();

const setStatement = (inputText: string) => {
  const newQuery = {...route.query};

  if (inputText === "") {
    delete newQuery["statement"];
  } else {
    newQuery.statement = inputText;
  }

  router.push({query: newQuery});
}

onMounted(() => {
  inputText.value = (route.query.statement as string) ?? ""
})
</script>

<template>
  <div class="bg-[#FAFAFA] flex justify-between rounded-xl px-4 py-3 shadow-lg/20">
      <input
        class="flex-1 text-ph text-black px-2 text-lg placeholder:font-normal outline-0" type="text" :placeholder="placeholder"
        v-model="inputText"
        @input="setStatement(inputText)"
        >
      <button>
        <router-link to="/search" class="flex justify-center"><img class="h-8 invert select-none" src="/public/imgs/header/search_icon.svg" alt=""></router-link>
      </button>
    </div>
</template>

<style scoped>
</style>
