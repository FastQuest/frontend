import { ref } from 'vue';
import { useAuthStore } from '@/stores/authStore';
import { isValidEmailFormat } from '@/utils/validation';

export function useAuth() {
  const email = ref('');
  const password = ref('');
  const rememberMe = ref(true);
  const isLoading = ref(false);
  const error = ref('');

  const handleLogin = async () => {
    const authStore = useAuthStore();
    
    error.value = '';

    const normalizedEmail = email.value.trim();

    if (!normalizedEmail || !password.value) {
      error.value = 'Preencha o e-mail e a senha.';
      return null;
    }

    if (!isValidEmailFormat(normalizedEmail)) {
      error.value = 'Informe um e-mail válido.';
      return null;
    }

    isLoading.value = true;

    try {
      const response = await authStore.login({
        email: normalizedEmail,
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