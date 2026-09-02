<script setup lang="ts">
import { useAuth } from '@/composables/useAuth';

const emit = defineEmits(['close', 'login-success']);

const { email, password, rememberMe, isLoading, error, handleLogin } = useAuth();

const onSubmit = async () => {
  const response = await handleLogin();
  if (response && !error.value) {
    emit('login-success', { userId: response.user_id });
    emit('close');
  }
};
</script>

<template>
  <Teleport to="body">
    <div 
      class="fixed inset-0 z-50 flex items-center justify-center bg-white/40 backdrop-blur-[2px] transition-all"
      @click.self="emit('close')"
    >
      <div class="bg-[#fafafa] rounded-xl shadow-2xl w-[90%] max-w-[26rem] overflow-hidden text-black font-sans">
        
        <div class="bg-black py-4">
          <h1 class="text-white text-center text-lg tracking-tight">LOGIN</h1>
        </div>

        <div class="px-8 py-6 flex flex-col items-center">
         <img 
            src="/public/imgs/header/user_icon.svg" 
            class="w-12 h-12 mb-6 invert" 
            alt="User Icon" 
         />
         
         <form @submit.prevent="onSubmit" class="w-full">
            <div class="flex flex-col gap-7 mb-7">
              <input 
                v-model="email"
                type="email" 
                placeholder="E-mail"
                :disabled="isLoading"
                class="w-full bg-white shadow-sm border border-gray-100 p-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-300 placeholder-gray-300 text-gray-700 font-medium text-xl disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <input 
                v-model="password"
                type="password" 
                placeholder="Senha"
                :disabled="isLoading"
                class="w-full bg-white shadow-sm border border-gray-100 p-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-300 placeholder-gray-300 text-gray-700 font-medium text-xl disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            <div v-if="error" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-5 text-sm font-medium">
              {{ error }}
            </div>

            <div class="flex justify-between items-center text-[16px] font-medium text-black mb-10 px-1">
              <label class="flex items-center gap-2 cursor-pointer select-none">
                <div class="relative flex items-center justify-center">
                <input 
                    v-model="rememberMe"
                    type="checkbox" 
                    class="peer appearance-none w-4 h-4 border border-gray-300 rounded-[4px] checked:bg-red-700 checked:border-red-700 cursor-pointer transition-all m-0" 
                />
                <svg class="absolute w-3 h-3 text-white pointer-events-none hidden peer-checked:block" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                </div>

                  <span class="leading-none">Lembre-se de mim</span>
              </label>
              <a href="#" class="hover:text-gray-600 transition-colors">Esqueceu sua senha?</a>
            </div>

            <div class="flex flex-col items-center gap-2">
              <button 
                type="submit"
                :disabled="isLoading"
                class="bg-black text-white px-16 py-2 rounded-lg hover:bg-gray-800 transition-colors tracking-tight text-sm shadow-md focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-black"
              >
                {{ isLoading ? 'Entrando...' : 'LOGIN' }}
              </button>
              
              <a href="#" class="text-[18px] font-medium text-black hover:text-gray-600 underline underline-offset-2 mt-2">
                Cadastre-se
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  </Teleport>
</template>