<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
</script>

<template>
  <NavBar />
  <section>
    <RouterView />
  </section>
</template>

<style scoped>
section {
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100vh;
}
</style>
