<script setup lang="ts">
    import { ref } from 'vue';
    import LoginCard from './LoginCard.vue';
    const showLogin = ref(false);
</script>

<template>
    <header id="header" class="bg-black flex justify-between items-center w-full p-6 md:px-12 select-none">
        <img class="h-10" src="/public/imgs/logo.png" alt="">
        
        <ul class="text-white text-xl font-normal hidden sm:flex items-center">
          <li class="hover:cursor-pointer"><router-link class="p-2" to="/">Home</router-link></li>
          <li class="hover:cursor-pointer"><router-link class="p-2" to="/questions">Questões</router-link></li>
          <li class="hover:cursor-pointer"><router-link class="p-2" to="/lists">Pastas</router-link></li>
          <li class="hover:cursor-pointer"><router-link class="p-2" to="/create">Criar</router-link></li>
          
          <li class="hover:cursor-pointer ml-4">
            <button type="button" @click="showLogin = true" class="flex items-center focus:outline-none">
                <img src="/public/imgs/header/user_icon.svg" class="h-10" alt="User Icon" />
            </button>
          </li>
        </ul>
        
        <img src="/public/imgs/icon_menu.svg" class="h-10 sm:hidden"/>
    </header>

    <LoginCard v-if="showLogin" @close="showLogin = false" />
</template>