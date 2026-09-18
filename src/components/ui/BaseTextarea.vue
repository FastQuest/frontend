<script setup lang="ts">
const props = defineProps<{
  modelValue?: string;
  placeholder?: string;
  rows?: number | string;
  class?: string;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();
</script>

<template>
  <textarea
    :value="modelValue"
    @input="(e) => emit('update:modelValue', (e.target as HTMLTextAreaElement).value)"
    :placeholder="placeholder"
    :rows="rows"
    class="text-black rounded-xl w-full p-3 bg-white shadow-sm border border-gray-100 focus:outline-none focus:ring-1 focus:ring-gray-300 placeholder-gray-300 font-medium"
    :class="props.class"
  ></textarea>
</template>
