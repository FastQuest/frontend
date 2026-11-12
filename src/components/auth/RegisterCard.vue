<script setup lang="ts">
import { ref } from 'vue';
import BaseInput from '@/components/ui/BaseInput.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import { useAuthStore } from '@/stores/authStore';

const emit = defineEmits<{
  (event: 'close'): void;
  (event: 'login'): void;
}>();

const authStore = useAuthStore();
const name = ref('');
const email = ref('');
const password = ref('');
const isLoading = ref(false);
const error = ref('');

const onSubmit = async () => {
  error.value = '';
  isLoading.value = true;

  try {
    await authStore.register({
      name: name.value.trim(),
      email: email.value.trim(),
      password: password.value,
    });
    emit('close');
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Erro ao criar conta. Tente novamente.';
    console.error('Registration error:', err);
  } finally {
    isLoading.value = false;
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
          <h1 class="text-white text-center text-lg tracking-tight">CADASTRO</h1>
        </div>

        <div class="px-8 py-6 flex flex-col items-center">
          <img
            src="/public/imgs/header/user_icon.svg"
            class="w-12 h-12 mb-6 invert"
            alt="Ícone de usuário"
          />

          <form @submit.prevent="onSubmit" class="w-full">
            <div class="flex flex-col gap-5 mb-6">
              <BaseInput
                v-model="name"
                type="text"
                placeholder="Nome"
                autocomplete="name"
                required
                :disabled="isLoading"
              />
              <BaseInput
                v-model="email"
                type="email"
                placeholder="E-mail"
                autocomplete="email"
                required
                :disabled="isLoading"
              />
              <BaseInput
                v-model="password"
                type="password"
                placeholder="Senha (mínimo 6 caracteres)"
                autocomplete="new-password"
                minlength="6"
                required
                :disabled="isLoading"
              />
            </div>

            <div
              v-if="error"
              role="alert"
              class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-5 text-sm font-medium"
            >
              {{ error }}
            </div>

            <div class="flex flex-col items-center gap-2">
              <BaseButton
                type="submit"
                :disabled="isLoading"
                class="px-16 py-2 tracking-tight text-sm shadow-md"
              >
                {{ isLoading ? 'Criando conta...' : 'CRIAR CONTA' }}
              </BaseButton>

              <button
                type="button"
                @click="emit('login')"
                class="text-[18px] font-medium text-black hover:text-gray-600 underline underline-offset-2 mt-2"
              >
                Já tem uma conta? Entrar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </Teleport>
</template>
