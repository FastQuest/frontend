<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppHeader from './components/layout/AppHeader.vue';
import AppFooter from './components/layout/AppFooter.vue';
import TheNotification from './components/ui/TheNotification.vue';
import ThePopUp from './components/ui/ThePopUp.vue';
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
