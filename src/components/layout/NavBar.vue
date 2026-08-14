<script setup lang="ts"></script>

<template>
  <header>
    <img src="/public/imgs/flashquest_logo.png" alt="" />
    <nav>
      <ul class="flex flex-col">
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/search">Questões</router-link></li>
        <li><router-link to="/search-lists">Pasta</router-link></li>
        <li><router-link to="/create-list">Criar</router-link></li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
header {
  display: flex;
  flex-direction: column;
  align-items: center;

  height: 100vh;
  width: 23%;

  background: rgb(5, 20, 39);
  background: linear-gradient(
    180deg,
    #051427 0%,
    #540D1B 51%,
    #A74223 100%
  );
}

img {
  width: 50%;
  margin: 10% 0;
}

li {
  display: flex;
  justify-content: center;
  list-style: none;
  width: 100%;
}

nav {
  width: 70%;
  margin: 50px 0;
}

nav ul li {
  border-bottom: 1px solid #b5a7aa;
  padding: 1.5vh 0;
}

a {
  font-size: 1.3rem;
  color: #d9d9d9;
}
</style>
