<script setup lang="ts">
import ActionBtns from '@/components/ActionBtns.vue';
import { onMounted, onUnmounted, ref } from 'vue';
import type { NewList } from '../models/NewList';
import { useRouter } from 'vue-router';
import type { Question } from '@/models/Question';

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
  router.push('/search/add-to-list');
};

const questions = ref<Question[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

async function fetchQuestions() {
  if (newListData.value.questions.length === 0) {
    questions.value = [];
    return;
  }
  loading.value = true
  error.value = null

  try {
    const response = await fetch('http://localhost:7777/questions/array', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        IDs: newListData.value.questions
      })
    })

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const data = await response.json()
    console.log(data)
    questions.value = data
  } catch (err: any) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

const isLoading = ref(false)
const response = ref<any>(null)

async function createQuestionSet() {
  isLoading.value = true
  error.value = null

  try {
    const res = await fetch('http://localhost:8080/question-set', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newListData.value)
    })

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`)
    }

    const data = await res.json()
    response.value = data
  } catch (err: any) {
    error.value = err.message
  } finally {
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
}

onMounted(() => {
  const stored = localStorage.getItem('newListData');

  if (stored) {
    const parsed = JSON.parse(stored);
    Object.assign(newListData.value, parsed);
    fetchQuestions();
  };
})

onUnmounted(() => {
  localStorage.setItem("newListData", JSON.stringify(newListData.value));
})
</script>

<template>
    <main class="px-[3vw] py-3 h-screen overflow-y-scroll flex flex-wrap justify-between">
        <header class="flex h-[9vh] w-full items-center gap-4 mb-3">
            <button class="bg-main flex items-center justify-center p-1 rounded-xl h-4/6 aspect-square hover:cursor-pointer">
                <img class="h-5/6 rotate-90" src="/public/imgs/arrow.png" alt="">
            </button>
            <h1 class="text-black text-2xl leading-none align-middle p-0 m-0 mt-1.5 whitespace-nowrap">Questões administrativas</h1>
            <img class="h-1/3 hover:cursor-pointer" src="/public/imgs/save.svg" alt="">
            <ActionBtns />
        </header>
        <div class="flex justify-between min-h-[0] w-full">
          <section class="w-8/12 classic-box-dark min-h-[80vh] rounded-2xl p-6">
            <div class="flex items-center justify-center h-10">
                <input v-model="newListData.name" class="h-full w-full text-lg p-3 rounded-xl mr-9 shadow text-black" type="text" placeholder="Adicione um nome para sua lista..." />
                <button @click.stop="goToAddToList" class="flex items-center h-full p-2 aspect-square bg-main rounded-xl hover:cursor-pointer shadow">
                    <img src="/public/imgs/plus.png" alt="Adicionar questão" class="h-full w-full"/>
                </button>
            </div>
            <ul>
                <li
                  v-for="(question, i) in questions"
                  :key="question.id"
                  class="flex blue-gradient text-white px-2 py-3 rounded-xl my-5">
                    <h2 class="text-lg px-4">{{ i + 1 }}</h2>
                    <p class="font-thin text-lg">{{ question.Statement }}</p>
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
    input {
        background-color: #F4F4F4;
        border: 1px solid #979494;
    }

    input::placeholder, textarea::placeholder {
        color: #979494;
    }

    .blue-gradient {
        background: linear-gradient(
            90deg,
            #6686AF 0%,
            #1D3F69 100%
        );
    }
</style>
