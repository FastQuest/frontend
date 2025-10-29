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
  <main class="flex flex-col w-full p-16 gap-8 relative overflow-hidden">
    <img class="absolute -mx-16 h-full -z-10" src="/public/imgs/questions/bg-1.svg" alt="">
    <img class="absolute right-0 -mx-16 h-full -z-10" src="/public/imgs/questions/bg-2.svg" alt="">
    <section class="flex w-full gap-16">
      <div class="w-full bg-[#FAFAFA] shadow-2xl/30 overflow-hidden rounded-2xl text-lg">
        <h1 class="text-center w-full p-5 bg-black text-white">Pasta Tributario</h1>
        <div class="flex text-black justify-between items-center p-10">
          <ul class="text-lg font-light">
            <li><b>Criador: </b>{{ list?.user_id }}</li>
            <li><b>Data: </b>{{ list?.creation_date.slice(0,4) }}</li>
            <li><b>Número de questões: </b>{{ questions?.length }} questões</li>
          </ul>
          <img class="h-36" src="/public/imgs/list/list_file_1.png" alt="">
        </div>
        <p class="text-black font-light text-lg px-10 pb-10">Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat eius pariatur eveniet illum, reiciendis obcaecati dignissimos perspiciatis sequi aperiam deleniti numquam ipsam optio molestiae enim amet qui voluptatem libero facere asperiores! Maxime iusto velit, ipsum blanditiis nihil voluptas nulla? Eos praesentium facere adipisci tempore incidunt, pariatur ullam hic architecto harum.</p>
      </div>
      <div class="w-102 bg-[#FAFAFA] shadow-2xl/30 overflow-hidden rounded-2xl text-lg text-black">
        <header class="text-center w-full p-5 bg-black text-white">
          <h1>Seu Último Resultado</h1>
        </header>
        <div class="flex flex-col p-6 gap-6">

          <div class="flex flex-col justify-center">
            <h2>Você acertou:</h2>
            <span class="flex justify-center items-center text-3xl h-22 rounded-xl w-full bg-white shadow-lg/20">45/80</span>
          </div>
          <p class="font-light">Veja um resumo do seu desempenho e explore os detalhes de cada questão para entender melhor seus acertos e pontos a melhorar. </p>
        </div>
      </div>
    </section>
    <section class="w-full rounded-2xl shadow-2xl/30 bg-[#FAFAFA] p-10">
      <ul class="text-lg flex flex-col gap-8">
            <li v-for="(question, i) in questions" class="gap-2 flex flex-col p-8 text-black overflow-hidden rounded-lg question w-full bg-white shadow-lg/30" :key="i">
                <h1>Questão {{ i + 1}}</h1>
                <p class="font-light my-auto text-wrap">
                    {{ question.Statement }}
                </p>
            </li>
      </ul>
    </section>
    <button
        @click="() => router.push(`/lists/${list!.id}/answering`)"
        class="fixed right-8 bottom-8 text-white px-10 py-3 text-2xl rounded-lg hover:cursor-pointer bg-black shadow-lg/30"
    >
          Responder
    </button>
  </main>
</template>
