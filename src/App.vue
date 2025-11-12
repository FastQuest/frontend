<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';
</script>

<template>
  <main class="flex flex-col min-h-screen">
    <AppHeader />
    <RouterView />
  </main>
  <AppFooter />
</template>

<style>
#app {
  display: flex;
  overflow-x: hidden;
  flex-direction: column;
}
</style>
