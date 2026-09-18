<script setup lang="ts">
import { computed } from 'vue';

type ButtonVariant = 'primary' | 'danger' | 'secondary' | 'outline' | 'icon';

const props = defineProps<{
  variant?: ButtonVariant;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  class?: string;
}>();

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void;
}>();

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'danger':
      return 'bg-[#AA4243] text-white hover:bg-[#8f3637]';
    case 'secondary':
      return 'bg-[#1D3F69] text-white hover:bg-[#152d4b]';
    case 'outline':
      return 'bg-transparent border border-black text-black hover:bg-gray-100';
    case 'icon':
      return 'bg-black text-white flex items-center justify-center p-2 aspect-square hover:bg-gray-800';
    case 'primary':
    default:
      return 'bg-black text-white hover:bg-gray-800';
  }
});
</script>

<template>
  <button
    :type="type || 'button'"
    :disabled="disabled"
    class="rounded-lg cursor-pointer transition-colors focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed shadow-sm text-center"
    :class="[variantClasses, props.class]"
    @click="(e) => emit('click', e)"
  >
    <slot></slot>
  </button>
</template>
