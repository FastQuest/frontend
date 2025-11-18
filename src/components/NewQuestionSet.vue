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
  description: "",
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
    <section class="flex flex-col px-16 p-8 h-screen gap-auto relative gap-8 snap-center">
        <h1 class="text-[#AA4243] text-3xl leading-none align-middle p-0 m-0 mt-1.5 whitespace-nowrap">Criando Questionário!</h1>
        <div class="flex justify-between gap-8 w-full h-full min-h-0">
          <img class="absolute w-screen -z-10 -mx-16 -mb-16" src="/public/imgs/new-list/bg.svg" alt="">
          <section name="Questions" class="flex flex-1 flex-col gap-5 bg-[#FAFAFA] shadow-lg/40 overflow-hidden rounded-2xl p-8 min-h-0">
            <div class="flex items-center h-11 gap-2">
                <input v-model="newListData.name" class="h-full w-full text-lg p-3 rounded-lg shadow/20 text-black" type="text" placeholder="Adicione um nome para sua lista..." />
                <button @click.stop="goToAddToList" class="flex items-center h-full p-2 aspect-square bg-black rounded-lg hover:cursor-pointer shadow/20">
                    <img src="/public/imgs/plus.png" alt="Adicionar questão" class="h-full w-full"/>
                </button>
            </div>
            <ul class="flex flex-col gap-5 overflow-y-scroll min-h-0">
                <li
                  v-for="(question, i) in questions"
                  :key="question.id"
                  class="flex flex-col bg-white text-black p-4 rounded-xl shadow/10">
                    <h2 class="text-lg">Questão {{ i + 1 }}</h2>
                    <p class="font-light text-lg leading-6">{{ question.Statement }}</p>
                </li>
            </ul>
          </section>
          <section class="min-w-75 flex flex-col justify-between">
            <div class="bg-[#FAFAFA] h-full overflow-hidden rounded-2xl flex flex-col shadow-lg/40">
              <h2 class="text-white bg-black p-4 text-lg text-center">INFORMAÇÕES</h2>
              <div class="w-full p-4">
                <textarea v-model="newListData.description" class="text-black rounded-xl h-50 w-full p-2 bg-white shadow/20" placeholder="Descrição da lista..." id=""></textarea>
              </div>
            </div>
            <button
              class="bg-black shadow-lg/40 w-full h-14 rounded-2xl mt-6 hover:cursor-pointer text-white text-xl"
              @click="createQuestionSet">Criar</button>
          </section>
        </div>
    </section>
</template>
