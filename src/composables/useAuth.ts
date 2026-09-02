import { ref } from 'vue';
import { useAuthStore } from '@/stores/authStore';

export function useAuth() {
  const email = ref('');
  const password = ref('');
  const rememberMe = ref(true);
  const isLoading = ref(false);
  const error = ref('');

  const handleLogin = async () => {
    const authStore = useAuthStore();
    
    error.value = '';

    if (!email.value || !password.value) {
      error.value = 'Email e senha são obrigatórios';
      return null;
    }

    if (!email.value.includes('@')) {
      error.value = 'Email inválido';
      return null;
    }

    isLoading.value = true;

    try {
      const response = await authStore.login({
        email: email.value,
        password: password.value,
      });

      email.value = '';
      password.value = '';

      return response;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erro ao fazer login. Tente novamente.';
      console.error('Login error:', err);
      return null;
    } finally {
      isLoading.value = false;
    }
  };

  return {
    email,
    password,
    rememberMe,
    isLoading,
    error,
    handleLogin,
  };
}