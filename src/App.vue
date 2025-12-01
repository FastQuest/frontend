<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';
import TheNotification from './components/TheNotification.vue';
import ThePopUp from './components/ThePopUp.vue';
</script>

<template>
  <ThePopUp />
  <main class="flex flex-col min-h-screen">
    <AppHeader />
    <RouterView />
  </main>
  <AppFooter />
  <TheNotification />
</template>

<style>
#app {
  @apply flex flex-col overflow-hidden
}
</style>
