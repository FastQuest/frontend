<script setup lang="ts">
    import { ref, computed, onMounted, watch } from 'vue';
    import LoginCard from './LoginCard.vue';
    import { authService } from '@/services/authService';
    import { useRouter } from 'vue-router';
    
    const router = useRouter();

    const showLogin = ref(false);
    const showUserMenu = ref(false);
    const firstName = ref<string | null>(null);

    const isLoggedIn = computed(() => authService.isAuthenticated());

    const fullName = computed(() => {
      const userProfile = authService.getUserProfile();
      if (userProfile && userProfile.name) {
        return userProfile.name.charAt(0).toUpperCase() + userProfile.name.slice(1);
      }
      return null;
    });

    const handleLoginSuccess = () => {
      firstName.value = authService.getFirstName();
    };

    const handleLogout = () => {
      authService.clearToken();
      firstName.value = null;
      showLogin.value = false;
    };

    const handleProfileClick = () => {
      router.push('/profile');
      showUserMenu.value = false;
    };

    // Monitorar mudanças na autenticação em tempo real
    watch(isLoggedIn, (newValue) => {
      if (newValue) {
        firstName.value = authService.getFirstName();
      } else {
        firstName.value = null;
      }
    });

    onMounted(() => {
      if (isLoggedIn.value) {
        firstName.value = authService.getFirstName();
      }

      // Fechar menu ao clicar fora
      window.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        const userMenuElement = document.querySelector('[data-user-menu]');
        if (userMenuElement && !userMenuElement.contains(target)) {
          showUserMenu.value = false;
        }
      });
    });
</script>

<template>
    <header id="header" class="bg-black flex justify-between items-center w-full p-6 md:px-12 select-none">
        <img class="h-10" src="/public/imgs/logo.png" alt="">
        
        <ul class="text-white text-xl font-normal hidden sm:flex items-center">
          <li class="hover:cursor-pointer"><router-link class="p-2" to="/">Home</router-link></li>
          <li class="hover:cursor-pointer"><router-link class="p-2" to="/questions">Questões</router-link></li>
          <li class="hover:cursor-pointer"><router-link class="p-2" to="/lists">Pastas</router-link></li>
          <li class="hover:cursor-pointer"><router-link class="p-2" to="/create">Criar</router-link></li>
          
          <li class="hover:cursor-pointer ml-4 relative" data-user-menu>
            <button 
              v-if="isLoggedIn && firstName" 
              type="button" 
              @click="showUserMenu = !showUserMenu"
              class="flex items-center justify-center focus:outline-none bg-gray-200 rounded-full w-10 h-10 text-sm font-semibold text-black hover:bg-gray-300 transition-colors"
            >
              {{ firstName.charAt(0).toUpperCase() }}
            </button>
            <button 
              v-else 
              type="button" 
              @click="showLogin = true" 
              class="flex items-center focus:outline-none"
            >
                <img src="/public/imgs/header/user_icon.svg" class="h-10" alt="User Icon" />
            </button>

            <!-- Dropdown Menu -->
            <div 
              v-if="showUserMenu && isLoggedIn && firstName"
              class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg overflow-hidden text-black z-40"
            >
              <div class="px-4 py-3 border-b border-gray-200 hover:cursor-default">
                <p class="font-semibold">{{ fullName }}</p>
              </div>
              <button
                @click="handleProfileClick"
                class="w-full text-left px-4 py-2 hover:cursor-pointer hover:bg-gray-100 transition-colors font-medium border-b border-gray-200"
              >
                Perfil
              </button>
              <button
                @click="handleLogout"
                class="w-full text-left px-4 py-2 hover:cursor-pointer hover:bg-gray-100 transition-colors text-red-600 font-medium"
              >
                Sair
              </button>
            </div>
          </li>
        </ul>
        
        <img src="/public/imgs/icon_menu.svg" class="h-10 sm:hidden"/>
    </header>

    <LoginCard v-if="showLogin" @close="showLogin = false" @login-success="handleLoginSuccess" />
</template>