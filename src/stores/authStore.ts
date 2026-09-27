import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { authService, type LoginRequest, type UserProfile } from '@/services/authService';

export const useAuthStore = defineStore('auth', () => {
  const user = ref<UserProfile | null>(authService.getUserProfile());
  const isAuthenticated = ref<boolean>(authService.isAuthenticated());

  const fullName = computed(() => {
    if (user.value && user.value.name) {
      return user.value.name.charAt(0).toUpperCase() + user.value.name.slice(1);
    }
    return null;
  });

  const firstName = computed(() => {
    if (user.value && user.value.name) {
      const parts = user.value.name.trim().split(' ');
      return parts[0];
    }
    return null;
  });

  const initAuth = () => {
    if (authService.isAuthenticated()) {
      user.value = authService.getUserProfile();
      isAuthenticated.value = true;
    } else {
      logout();
    }
  };

  const login = async (credentials: LoginRequest) => {
    const response = await authService.login(credentials);
    const userProfile = await authService.getCurrentUser(response.access_token);

    authService.saveToken(response, userProfile);
    user.value = userProfile;
    isAuthenticated.value = true;

    return response;
  };

  const logout = () => {
    authService.clearToken();
    user.value = null;
    isAuthenticated.value = false;
  };

  return {
    user,
    isAuthenticated,
    fullName,
    firstName,
    initAuth,
    login,
    logout,
  };
});