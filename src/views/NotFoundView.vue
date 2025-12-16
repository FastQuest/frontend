<script setup lang="ts">
import { ErrorCode, ErrorMessages } from '@/utils/errors';
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const message = ref("Acho que você não deveria estar aqui.")

const route = useRoute()

watch(() => route.params.id, (newId, oldId) => {
if (newId && newId !== oldId) console.log("oi")
})

onMounted(() => {
  const { code } = route.query

  console.log(!Object.values(ErrorCode).includes(code as ErrorCode))
  if (!code || !Object.values(ErrorCode).includes(code as ErrorCode)) return

  message.value = ErrorMessages[code as ErrorCode]
})
</script>

<template>
    <main class="flex flex-1 p-16">
        <h1 class="text-gray-500 text-3xl">{{ message }} <br>  (⌐⎚_⎚)</h1>
    </main>
</template>
