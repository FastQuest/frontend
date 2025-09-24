<script setup lang="ts">
</script>

<template>
    <header class="bg-black flex justify-between items-center w-full h-[12vh] px-6 md:px-12 select-none">
        <img class="w-24 h-fit" src="/public/imgs/logo.png" alt="">
        <ul class="text-white text-xl font-normal gap-6 hidden sm:flex">
          <li class="hover:cursor-pointer">Home</li>
          <li class="hover:cursor-pointer">Questões</li>
          <li class="hover:cursor-pointer">Pastas</li>
          <li class="hover:cursor-pointer">Criar</li>
        </ul>
        <img src="/public/imgs/icon_menu.svg" class="h-3/6 sm:hidden"/>
    </header>
</template>
