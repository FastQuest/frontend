<script setup lang="ts">
    const emit = defineEmits(['close']);
</script>

<template>
  <Teleport to="body">
    <div 
      class="fixed inset-0 z-50 flex items-center justify-center bg-white/20 backdrop-blur-[3px] transition-all"
      @click.self="emit('close')"
    >
    </div>
  </Teleport>
</template>