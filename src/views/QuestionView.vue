<script setup lang="ts">
import ActionBtns from '@/components/ActionBtns.vue'
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import type { DetailQuestion } from '@/models/DetailQuestion.ts'
import CopyBtn from '@/components/CopyBtn.vue'
import { API_BASE_URL } from '@/config/api'

const route = useRoute()
const question = ref<DetailQuestion | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)
const showCorrect = ref(false)

const answerSwitch = () => {
  showCorrect.value = !showCorrect.value
  console.log(showCorrect.value)
}

const fetchQuestion = async (id: string | number) => {
  loading.value = true
  error.value = null

  try {
    const res = await fetch(`${API_BASE_URL}/question/${id}?detail=full`)
    if (!res.ok) throw new Error(`Erro ao buscar questão: ${res.status}`)
    const data: DetailQuestion = await res.json()
    question.value = data
    console.log(question.value)
  } catch (err: unknown) {
    error.value = err instanceof Error ? err.message : String(err)
  } finally {
    loading.value = false
  }
}

const questionText = () => {
  let text = question.value?.statement + '\n\n'

  for (const value of question.value?.answers ?? []) {
    text += value.Text + '\n'
  }

  return text
}

onMounted(() => {
  fetchQuestion(route.params.id as string)
})

watch(
  () => route.params.id,
  (newId) => {
    fetchQuestion(newId as string)
  },
)
</script>

<template>
  <main class="h-screen w-full overflow-visible px-[3vw] py-3">
    <header class="w-full h-full flex items-center justify-between">
      <div class="flex gap-3 h-full w-fit items-center">
        <h1 class="text-black text-2xl leading-none align-middle p-0 m-0 inline mt-1.5">
          Questão #{{ question?.id }}
        </h1>
        <img class="h-1/3 hover:cursor-pointer" src="/public/imgs/save.svg" alt="" />
        <CopyBtn v-if="question" :text="questionText()" />
      </div>
      <!-- <ul class="flex">
        <li v-for="n in 5" :key="n">
          <img src="/public/imgs/star_full.svg" alt="">
        </li>
      </ul> -->
    </header>
    <ActionBtns />
    <section class="question-box overflow-y-scroll overflow-x-visible gap-10">
      <p class="classic-box rounded-3xl p-7 text-lg font-light text-black">
        {{ question?.statement }}
      </p>
      <ul class="flex flex-col gap-5">
        <li
          class="flex items-center gap-3 classic-box rounded-3xl p-3 relative"
          v-for="(answer, i) in question?.answers"
          :key="answer.ID"
        >
          <span
            :class="[
              'rounded-xl leading-0.5 align-middle h-10 aspect-square flex justify-center items-center text-xl pt-1.5',
              showCorrect
                ? answer.Is_correct
                  ? 'correct-gradient text-white'
                  : 'wrong-gradient text-white'
                : 'gradient-border text-black',
            ]"
          >
            {{ ['A', 'B', 'C', 'D'][i] }}
          </span>
          <p class="font-light text-lg text-black">{{ answer.Text }}</p>
          <img
            class="absolute h-5/6 max-h-16 right-0 bottom-0"
            src="/public/imgs/correct.svg"
            v-if="answer.Is_correct && showCorrect"
          />
        </li>
      </ul>
    </section>
    <section class="flex flex-col items-center rounded-2xl overflow-hidden">
      <h1 class="bg-main text-white text-center text-xl p-3 w-full">Informações</h1>
      <div class="classic-box h-full w-full rounded-b-2xl">
        <ul class="text-base p-5 flex flex-col items-center gap-2 text-black">
          <li class="w-full">Criador: {{ question?.user?.name ?? 'indefinido' }}</li>
          <hr class="border-main w-5/6" />
          <li class="w-full">Fonte: {{ question?.source?.Type ?? 'indefinido' }}</li>
          <hr class="border-main w-5/6" />
          <li class="w-full">Data: {{ question?.source?.Metadata.year ?? 'indefinido' }}</li>
          <hr class="border-main w-5/6" />
          <li class="w-full">Disciplina: {{ question?.subject?.Name ?? 'indefinido' }}</li>
          <hr class="border-main w-5/6" />
          <!-- <li class="w-full">
            <h2>Assunto: </h2>
            <ul class="w-full h-full flex py-2 gap-2">
              <li class="rounded-xl flex items-center h-fit py-1 px-3 gap-2 bg-topic font-light">
                <p class="text-white leading-none h-full">{{ question?.topic?.Name ?? 'indefinido' }}</p>
              </li>
            </ul>
          </li> -->
        </ul>
      </div>
      <button
        @click="answerSwitch"
        class="bg-button text-white py-3 m-2 w-full rounded-2xl text-xl hover:cursor-pointer"
      >
        {{ showCorrect ? 'Esconder' : 'Ver Respostas' }}
      </button>
    </section>
  </main>
</template>

<style scoped>
main {
  display: grid;
  grid-template-columns: 3.5fr 1fr;
  grid-template-rows: 9vh auto;
  gap: 4%;
}

.question-box {
  display: flex;
  flex-direction: column;
}

.gradient-border {
  border: 3px solid transparent;
  background:
    linear-gradient(white, white) padding-box,
    /* fundo do conteúdo */ linear-gradient(180deg, #051427, #540d1b, #a74223) border-box; /* borda gradient */
}

.correct-gradient {
  background: linear-gradient(180deg, #1d3f69, #6686af);
}

.wrong-gradient {
  background: linear-gradient(180deg, #aa4243, #540d1b);
}

.bg-topic {
  background: linear-gradient(90deg, #6686af 0%, #1d3f69 100%);
}
</style>
