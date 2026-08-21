<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import type { NewList } from '../../models/NewList';
import { useRouter } from 'vue-router';
import type { Question } from '@/models/Question';
import { questionRepository } from '@/repositories/questionRepository';
import { useWindowSize } from '@vueuse/core';
import { questionSetRepository } from '@/repositories/questionSetRepository';
import TheCard from '@/components/ui/TheCard.vue';
import { useNotification } from '@/composables/notification';

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
}

const isLoading = ref(false)
const response = ref<any>(null)

const { notify } = useNotification()

async function createQuestionSet() {
  isLoading.value = true
  error.value = null

  if (questions.value.length < 2) {
    notify("Adicione pelo menos 2 questões para criar uma pasta.")
    return
  }

  if (newListData.value.name === "") newListData.value.name = "Pasta sem nome"
  if (newListData.value.description === "") newListData.value.description = "Sem descrição"

  console.log(newListData.value)
  const { data } = await questionSetRepository.sendQuestionSet(newListData.value)
  console.log(data)

  if (!data) return
  response.value = data
  console.log(data)

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

  router.push(`/lists/${data.id}`);
}

const removeItem = (item: Question) => {
  questions.value = questions.value.filter(q => q.id !== item.id)
  newListData.value.questions = newListData.value.questions.filter(id => id !== item.id)
  localStorage.setItem("newListData", JSON.stringify(newListData.value));
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
    <section id="new-questionset" class="flex flex-col px-16 p-8 h-screen gap-auto relative gap-8 snap-center">
        <h1 class="text-[#AA4243] text-3xl leading-none align-middle p-0 m-0 mt-1.5 whitespace-nowrap">Criando Questionário!</h1>
        <div class="flex justify-between gap-8 w-full h-full min-h-0">
          <img class="absolute w-screen -z-10 -mx-16 -mb-16" src="/public/imgs/new-list/bg.svg" alt="">
          <section name="Questions" class="flex flex-1 flex-col gap-5 bg-[#FAFAFA] shadow-lg/40 rounded-2xl p-8 min-h-0">
            <div class="flex items-center h-11 gap-2">
                <input v-model="newListData.name" class="h-full w-full text-lg p-3 rounded-lg shadow/20 text-black" type="text" placeholder="Adicione um nome para sua lista..." />
                <button @click.stop="goToAddToList" class="flex items-center h-full p-2 aspect-square bg-black rounded-lg hover:cursor-pointer shadow/20">
                    <img draggable="false" src="/public/imgs/plus.png" alt="Adicionar questão" class="h-full w-full select-none"/>
                </button>
            </div>
            <ul class="flex flex-col gap-5 overflow-y-scroll min-h-0">
                <li
                  v-for="(question, i) in questions"
                  :key="question.id"
                  class="flex flex-col justify-around bg-white text-black gap-4 p-6 rounded-xl shadow-lg/10 h-min">
                    <div class="flex justify-between items-center">
                      <h2 class="text-xl leading-4">Questão {{ i + 1 }}</h2>
                      <button class="hover:cursor-pointer" @click="removeItem(question)">
                        <img draggable="false" class="invert aspect-square h-8 select-none" src="/imgs/close.png" alt="">
                      </button>
                    </div>
                    <span class="w-full h-[1px] block bg-[#D9D9D9] rounded"></span>
                    <p class="font-light text-lg leading-6">{{ question.statement }}</p>
                </li>
            </ul>
          </section>
          <section class="min-w-75 flex flex-col justify-between">
            <TheCard class="h-full" title="INFORMAÇÕES">
              <ul class="text-black text-lg">
                <li>Número de questões: {{ questions.length }}</li>
              </ul>
              <div class="w-full">
                <textarea v-model="newListData.description" class="text-black rounded-xl h-50 w-full p-2 bg-white shadow/20" placeholder="Descrição da lista..." id=""></textarea>
              </div>
            </TheCard>
            <button
              class="bg-black shadow-lg/40 w-full h-14 rounded-2xl mt-6 hover:cursor-pointer text-white text-xl"
              @click="createQuestionSet">Criar</button>
          </section>
        </div>
    </section>
</template>
