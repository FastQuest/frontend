import { defineStore } from 'pinia';
import { ref } from 'vue';
import { authService } from '@/services/authService';

export const useAuthStore = defineStore('auth', () => {
  const user = ref<any | null>(null);
  const isAuthenticated = ref(false);

  const login = async (credentials: { email: string; password: string }) => {
    const response = await authService.login(credentials);
    const userProfile = await authService.getCurrentUser(response.access_token);

    authService.saveToken(response, userProfile);
    user.value = userProfile;
    isAuthenticated.value = true;

    return response;
  };

  const logout = () => {
    user.value = null;
    isAuthenticated.value = false;
  };

  return {
    user,
    isAuthenticated,
    login,
    logout,
  };
});