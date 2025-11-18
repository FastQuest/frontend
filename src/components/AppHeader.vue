<script setup lang="ts">
</script>

<template>
    <header class="bg-black flex justify-between items-center w-full h-[12vh] px-6 md:px-12 select-none">
        <img class="w-24 h-fit" src="/public/imgs/logo.png" alt="">
        <ul class="text-white text-xl font-normal gap-6 hidden sm:flex">
          <li class="hover:cursor-pointer"><router-link to="/">Home</router-link></li>
          <li class="hover:cursor-pointer"><router-link to="/questions">Questões</router-link></li>
          <li class="hover:cursor-pointer"><router-link to="/lists">Pastas</router-link></li>
          <li class="hover:cursor-pointer"><router-link to="/create">Criar</router-link></li>
        </ul>
        <img src="/public/imgs/icon_menu.svg" class="h-3/6 sm:hidden"/>
    </header>
</template>
