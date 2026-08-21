<template>
  <div class="topic w-full bg-[#F4F4F4] shadow-md h-4/12 rounded-xl flex justify-center flex-col p-2">
      <div class="w-full bg-white h-fit rounded-lg shadow pl-3 py-1">
        <p>Assunto</p>
      </div>
      <ul class="w-full h-full flex py-2 gap-2">
        <li class="rounded-md flex items-center h-fit py-1 px-1.5 gap-2 bg-[#AA4243]">
          <p class="text-white leading-none h-full">Cachorro</p>
          <img src="/public/imgs/close.png" class="h-4 hover:cursor-pointer" alt="">
        </li>
      </ul>
    </div>
</template>

<style scoped>

.topic div:hover {
  cursor: pointer;
}

.topic div:first-child p {
  color: #C5C5C5;
}
</style>
