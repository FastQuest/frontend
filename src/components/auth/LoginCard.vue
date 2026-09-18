<script setup lang="ts">
import { useAuth } from '@/composables/useAuth';
import BaseInput from '@/components/ui/BaseInput.vue';
import BaseCheckbox from '@/components/ui/BaseCheckbox.vue';
import BaseButton from '@/components/ui/BaseButton.vue';

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
              <BaseInput 
                v-model="email"
                type="email" 
                placeholder="E-mail"
                :disabled="isLoading"
              />
              <BaseInput 
                v-model="password"
                type="password" 
                placeholder="Senha"
                :disabled="isLoading"
              />
            </div>

            <div v-if="error" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-5 text-sm font-medium">
              {{ error }}
            </div>

            <div class="flex justify-between items-center text-[16px] font-medium text-black mb-10 px-1">
              <BaseCheckbox 
                v-model="rememberMe" 
                label="Lembre-se de mim" 
              />
              <a href="#" class="hover:text-gray-600 transition-colors">Esqueceu sua senha?</a>
            </div>

            <div class="flex flex-col items-center gap-2">
              <BaseButton 
                type="submit"
                :disabled="isLoading"
                class="px-16 py-2 tracking-tight text-sm shadow-md"
              >
                {{ isLoading ? 'Entrando...' : 'LOGIN' }}
              </BaseButton>
              
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