<script setup lang="ts">
const props = defineProps<{
  modelValue?: string | number;
  type?: 'text' | 'password' | 'email' | 'number';
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  class?: string;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void;
}>();
</script>

<template>
  <input
    :type="type || 'text'"
    :value="modelValue"
    @input="(e) => emit('update:modelValue', (e.target as HTMLInputElement).value)"
    :placeholder="placeholder"
    :disabled="disabled"
    class="w-full bg-white shadow-sm border border-gray-100 p-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-300 placeholder-gray-300 text-gray-700 font-medium text-xl disabled:opacity-50 disabled:cursor-not-allowed"
    :class="[
      error ? 'border-red-500 focus:ring-red-500' : '',
      props.class
    ]"
  />
</template>
