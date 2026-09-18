<script setup lang="ts">
const props = defineProps<{
  modelValue?: boolean;
  label?: string;
  class?: string;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
}>();
</script>

<template>
  <label class="flex items-center gap-2 cursor-pointer select-none" :class="props.class">
    <div class="relative flex items-center justify-center">
      <input 
        type="checkbox" 
        :checked="modelValue"
        @change="(e) => emit('update:modelValue', (e.target as HTMLInputElement).checked)"
        class="peer appearance-none w-4 h-4 border border-gray-300 rounded-[4px] checked:bg-red-700 checked:border-red-700 cursor-pointer transition-all m-0" 
      />
      <svg class="absolute w-3 h-3 text-white pointer-events-none hidden peer-checked:block" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
      </svg>
    </div>
    <span v-if="label" class="leading-none">{{ label }}</span>
    <slot v-else></slot>
  </label>
</template>
