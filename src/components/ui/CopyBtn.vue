<script setup lang="ts">

const props = defineProps<{
  text: string
}>()

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(props.text);
  } catch (err) {
    alert('Falha ao copiar');
  }
};
</script>

<template>
        <img class="h-1/3 hover:cursor-pointer" src="/public/imgs/copy.png" alt="Copy Icon" @click="copyToClipboard">
</template>