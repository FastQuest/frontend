<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';

interface Select {
  label: string,
  value: string
}

interface Props {
  placeholder: string,
  selects: Select[],
  selectedValue: string
}

const props = defineProps<Props>()

const isOpen = ref<boolean>(false);

const selected = ref<Select>({label: "", value: ""});

const openSelects = () => {
  isOpen.value = !isOpen.value;
}

const emit = defineEmits<{(e: 'select', item: Select): void}>();

const select = (item: Select) => {
  selected.value = item
  isOpen.value = false
  emit('select', item);
}

const root = ref<HTMLElement | null>(null)

function handleClickOutside(event: MouseEvent) {
  if (!root.value) return

  if (!root.value.contains(event.target as Node)) {
    isOpen.value = false;
  }
}

onMounted(() => {
  const encontrado = props.selects.find(item => item.value === props.selectedValue);
  selected.value = encontrado ?? { label: props.placeholder, value: "" };
});

watch(() => props.selectedValue, (newValue: string) => {
  selected.value = props.selects.find(item => item.value === newValue) ?? {label: props.placeholder, value: ""};
})

watch(isOpen, (open) => {
  if (open) {
    document.addEventListener('click', handleClickOutside);
  } else {
    document.removeEventListener('click', handleClickOutside);
  }
});
</script>

<template>
  <div ref="root" class="w-full hover:cursor-pointer select-none relative font-light text-base">
      <div
      :class="[
          'overflow-hidden px-3 py-1 w-full flex justify-between items-center bg-white shadow-md',
          isOpen ? 'openInput' : 'rounded-md'
      ]"
      @click="openSelects"
      >
        <p :class="['w-full flex-1 mt-0.5', selected?.label === props.placeholder ?  'text-[#C5C5C5]' : 'text-black']">{{ selected?.label }}</p>
        <img :class="['h-5 invert', isOpen ? 'rotate-180' : '']" src="/public/imgs/arrow.png" alt="">
      </div>
      <ul
        class="absolute top-full w-full selects bg-white shadow-md z-10"
        v-if="isOpen"
      >
        <li
          class="text-black px-3 py-1 hover:bg-[#e5e5e5]"
          v-for="(item, i) in selects"
          :key="i"
          @click="select(item)"
        >
          {{ item.label }}
        </li>
      </ul>
  </div>
</template>

<style scoped>
  .selects {
    border-radius: 0 0 0.375rem 0.375rem;
  }

  .openInput {
    border-radius: 0.375rem 0.375rem 0  0;
  }
</style>
