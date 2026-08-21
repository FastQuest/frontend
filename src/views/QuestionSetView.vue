<script setup lang="ts">
import QuestionSetGrade from '@/components/questionset/QuestionSetGrade.vue';
import TheCard from '@/components/ui/TheCard.vue';
import type { List } from '@/models/List';
import type { Question } from '@/models/Question';
import { questionRepository } from '@/repositories/questionRepository';
import { questionSetRepository } from '@/repositories/questionSetRepository';
import { onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const route = useRoute();
const router = useRouter();
const list = ref<List | null>(null);

const fetchList = async (id: number) => {
  const { data } = await questionSetRepository.getListById(id, ["user"])
  list.value = data!
}

const questions = ref<Question[] | null>(null)

const fetchQuestions = async (id: number) => {
  const { data } = await questionRepository.getQuestionsBySet(id)
  questions.value = data!;
}

onMounted(() => {
  fetchList(Number(route.params.id))
  fetchQuestions(Number(route.params.id))
})
</script>

<template>
  <main class="flex flex-col w-full p-16 gap-8 relative overflow-hidden">
    <img class="absolute -mx-16 h-full -z-10" src="/public/imgs/questions/bg-1.svg" alt="">
    <img class="absolute right-0 -mx-16 h-full -z-10" src="/public/imgs/questions/bg-2.svg" alt="">
    <section class="flex w-full gap-16">
      <TheCard :title="list?.name" class="flex-1" inside-class="gap-8" inside-pd="md">
        <div class="flex text-black justify-between items-center">
          <ul class="text-lg font-light">
            <li><b>Criador: </b>{{ list?.user.name }}</li>
            <li><b>Data: </b>{{ list?.createdAt.slice(0,4) }}</li>
            <li><b>Número de questões: </b>{{ questions?.length }} questões</li>
          </ul>
          <img class="h-36" src="/public/imgs/list/list_file_1.png" alt="">
        </div>
        <p class="text-black font-light text-lg">{{ list?.description }}</p>
      </TheCard>
      <QuestionSetGrade :question-set-id="Number(route.params.id)" />
    </section>
    <section class="w-full rounded-2xl shadow-2xl/30 bg-[#FAFAFA] p-10">
      <ul class="text-lg flex flex-col gap-8">
            <li v-for="(question, i) in questions" class="flex flex-col justify-around bg-white text-black gap-4 p-6 rounded-xl shadow-lg/10 h-min" :key="i">
                <h2 class="text-xl leading-4">Questão {{ i + 1 }}</h2>
                <span class="w-full h-[1px] block bg-[#D9D9D9] rounded"></span>
                <p class="font-light text-lg leading-6">{{ question.statement }}</p>
            </li>
      </ul>
    </section>
    <button
        @click="() => router.push(`/lists/${list!.id}/answer`)"
        class="fixed right-8 bottom-8 text-white px-10 py-3 text-2xl rounded-lg hover:cursor-pointer bg-black shadow-lg/30"
    >
          Responder
    </button>
  </main>
</template>
