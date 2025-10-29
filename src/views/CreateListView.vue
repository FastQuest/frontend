<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import type { NewList } from '../models/NewList';
import { useRouter } from 'vue-router';
import type { Question } from '@/models/Question';
import { questionRepository } from '@/repositories/questionRepository';
import { limitChars } from '@/utils/text';
import { useWindowSize } from '@vueuse/core';
import { questionSetRepository } from '@/repositories/questionSetRepository';

const newListData = ref<NewList>({
  name: "",
  type: "list",
  desc: "",
  is_private: false,
  user_id: 1,
  questions: []
})

const router = useRouter();

const goToAddToList = () => {
  router.push('/list/addquestion');
};

const questions = ref<Question[]>([])
const error = ref<string | null>(null)
const { height } = useWindowSize()

const loadQuestions = async () => {
  if (newListData.value.questions.length === 0) {
    questions.value = [];
    return;
  }
  const { data } = await questionRepository.getQuestionsByArray(newListData.value.questions)

  questions.value = data ?? []

  const maxChars = Math.round(height.value / 3.5)
    questions.value = questions.value.map(q => ({
      ...q,
      Statement: limitChars(q.Statement, maxChars)
  }))

}

const isLoading = ref(false)
const response = ref<any>(null)

async function createQuestionSet() {
  isLoading.value = true
  error.value = null

  const { data } = await questionSetRepository.sendQuestionSet(newListData.value)

  if (!data) return
  console.log("foi")
  response.value = data

  isLoading.value = false
  Object.assign(newListData.value, {
      name: "",
      type: "list",
      desc: "",
      is_private: false,
      user_id: 1,
      questions: []
  });
  localStorage.removeItem('newListData');
  questions.value = []
}

onMounted(() => {
  const stored = localStorage.getItem('newListData');

  if (stored) {
    const parsed = JSON.parse(stored);
    Object.assign(newListData.value, parsed);
    loadQuestions();
  }
})

onUnmounted(() => {
  localStorage.setItem("newListData", JSON.stringify(newListData.value));
})
</script>

<template>
    <main class="flex flex-wrap justify-between p-16 gap-8 relative">
        <header class="flex h-[9vh] w-full items-center gap-4">
            <button class="bg-main flex items-center justify-center p-1 rounded-xl h-4/6 aspect-square hover:cursor-pointer">
                <img class="h-5/6 rotate-90" src="/public/imgs/arrow.png" alt="">
            </button>
            <h1 class="text-black text-2xl leading-none align-middle p-0 m-0 mt-1.5 whitespace-nowrap">Criando Questionário!</h1>
        </header>
        <div class="flex justify-between h-screen w-full">
          <img class="absolute w-screen -z-10 -mx-16 -mb-16" src="/public/imgs/new-list/bg.svg" alt="">
          <section class="flex flex-col gap-5 w-8/12 bg-[#FAFAFA] shadow-lg/40 overflow-hidden rounded-2xl min-h-screen p-6">
            <div class="flex items-center h-11 gap-2">
                <input v-model="newListData.name" class="h-full w-full text-lg p-3 rounded-lg shadow/20 text-black" type="text" placeholder="Adicione um nome para sua lista..." />
                <button @click.stop="goToAddToList" class="flex items-center h-full p-2 aspect-square bg-black rounded-lg hover:cursor-pointer shadow/20">
                    <img src="/public/imgs/plus.png" alt="Adicionar questão" class="h-full w-full"/>
                </button>
            </div>
            <ul class="flex flex-col gap-5 overflow-y-scroll h-full">
                <li
                  v-for="(question, i) in questions"
                  :key="question.id"
                  class="flex flex-col bg-white text-black p-4 rounded-xl shadow/10">
                    <h2 class="text-lg">Questão {{ i + 1 }}</h2>
                    <p class="font-light text-lg leading-6">{{ question.Statement }}</p>
                </li>
            </ul>
          </section>
          <section class="w-3/12 h-[84vh] flex flex-col justify-between flex-[0_0_auto]">
            <div class="classic-box-dark h-full rounded-2xl flex flex-col p-6">
              <h2 class="text-black text-xl">Informações</h2>
              <textarea v-model="newListData.desc" class="text-black classic-box rounded-xl h-2/6 p-2" placeholder="Descrição da lista..." id=""></textarea>
            </div>
            <button
              class="bg-button w-full h-14 rounded-2xl mt-6 hover:cursor-pointer text-white text-xl"
              @click="createQuestionSet">Criar</button>
          </section>
        </div>
    </main>
</template>

<style scoped>
    .blue-gradient {
        background: linear-gradient(
            90deg,
            #6686AF 0%,
            #1D3F69 100%
        );
    }
</style>
