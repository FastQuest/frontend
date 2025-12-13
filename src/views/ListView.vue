<script setup lang="ts">
import ActionBtns from '@/components/ActionBtns.vue';
import { API_BASE_URL } from '@/config/api';
import type { List } from '@/models/List';
import type { Question } from '@/models/Question';
import { onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const route = useRoute();
const router = useRouter();
const list = ref<List | null>(null);
const loading = ref(true);
const error = ref<string | null>(null);

const fetchList = async (id: string | number) => {
  loading.value = true
  error.value = null

  try {
    const res = await fetch(`${API_BASE_URL}/question-set/${id}`)
    if (!res.ok) throw new Error(`Erro ao buscar questão: ${res.status}`)
    const data: List = await res.json()
    list.value = data
  } catch (err: any) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

const questions = ref<Question[] | null>(null)

const fetchQuestions = async (id: string | number) => {
  loading.value = true
  error.value = null

  try {
    const res = await fetch(`${API_BASE_URL}/question-set/${id}/questions`)
    if (!res.ok) throw new Error(`Erro ao buscar questão: ${res.status}`)
    const data: Question[] = await res.json()
    questions.value = data
  } catch (err: any) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchList(route.params.id as string)
  fetchQuestions(route.params.id as string)
})

</script>

<template>
    <main class="w-full min-h-screen overflow-y-scroll gap-7 flex flex-col px-[3vw]">
        <header class="flex h-[9vh] items-center gap-4 mt-6">
            <button
              @click="() => router.replace('/search-lists')"
              class="bg-main flex items-center justify-center p-1 rounded-xl h-4/6 aspect-square hover:cursor-pointer">
                <img class="h-5/6 rotate-90" src="/public/imgs/arrow.png" alt="">
            </button>
            <h1 class="text-black text-2xl leading-none align-middle p-0 m-0 mt-1.5 whitespace-nowrap">{{ list?.name }}</h1>
            <img class="h-1/3 hover:cursor-pointer" src="/public/imgs/save.svg" alt="">

            <ActionBtns />
        </header>
        <section class="flex justify-between h-[35vh]">
            <div class="flex flex-col justify-center items-center w-2/6 aspect-square">
                <img src="/public/imgs/list/list_file_1.png" alt="" class="h-[100%] object-contain">
            </div>
            <div class="w-full h-full classic-box rounded-3xl flex items-center p-8 gap-10">
                <ul class="text-black text-lg whitespace-nowrap">
                    <li>Criador: Teste</li>
                    <li>Fonte: Alguma ai</li>
                    <li>Data: {{ list?.creation_date.slice(0,4) }}</li>
                    <li>Disciplina: Extra Curricular</li>
                </ul>
                <span class="block w-[1px] h-5/6"></span>
                <p class="text-black font-light text-lg h-full overflow-y-auto"> {{ list?.description }}</p>
            </div>
        </section>
        <ul class="w-full rounded-2xl text-lg p-10 questions flex flex-col gap-3">
            <li v-for="(question, i) in questions" class="flex text-black overflow-hidden rounded-2xl question w-full" :key="i">
                <div class="h-full w-32 flex justify-center items-center text-white shrink-0">
                    <p>Questão #{{ i }}</p>
                </div>
                <p class="font-light my-auto px-5 py-5 text-wrap">
                    {{ question.statement }}
                </p>
            </li>
        </ul>
        <button
          @click="() => router.push(`/list/${list!.id}/answering`)"
          class="absolute right-8 bottom-8 text-white px-10 py-3 text-2xl rounded-2xl hover:cursor-pointer res-btn">
            Responder
        </button>
    </main>
</template>

<style scoped>
    span {
        background-color: #979494;
    }

    .questions {
        background-color: #EAEAEA;
        border: .5px solid #D9D9D9;
        filter: drop-shadow(4px 4px 10px #b0b0b0);

    }

    .question div {
        background: linear-gradient(180deg, #6686AF, #1D3F69);
    }

    .question {
        background-color: #F4F4F4;
        filter: drop-shadow(0px 4px 4px #b0b0b0);
    }

    .res-btn {
        background: linear-gradient(180deg, #540D1B, #AA4243);
    }
</style>
