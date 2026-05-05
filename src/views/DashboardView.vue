<script setup lang="ts">
import ActionBtns from '@/components/ActionBtns.vue';
import { ref, onMounted } from 'vue';

// Dados de exemplo para o dashboard
const stats = ref({
  totalQuestions: 0,
  totalLists: 0,
  answeredQuestions: 0,
  successRate: 0
});

const recentLists = ref([
  { id: 1, name: 'Lista de Direito Civil', questions: 25, date: '2024-05-10' },
  { id: 2, name: 'Lista de Direito Penal', questions: 30, date: '2024-05-12' },
  { id: 3, name: 'Lista de Direito Constitucional', questions: 20, date: '2024-05-14' }
]);

const recentActivity = ref([
  { action: 'Respondeu 15 questões', date: '2024-05-15', time: '10:30' },
  { action: 'Criou nova lista', date: '2024-05-14', time: '14:20' },
  { action: 'Completou Lista de Direito Civil', date: '2024-05-13', time: '16:45' }
]);

onMounted(() => {
  // Aqui você pode fazer chamadas à API para buscar dados reais
  stats.value = {
    totalQuestions: 150,
    totalLists: 12,
    answeredQuestions: 89,
    successRate: 78
  };
});
</script>

<template>
  <main class="px-[3vw] py-3 flex flex-col gap-6 h-screen overflow-y-auto">
    <header class="flex w-full justify-between h-[9vh] items-center">
      <h1 class="text-black text-3xl font-semibold">Dashboard</h1>
      <ActionBtns />
    </header>

    <!-- Estatísticas -->
    <section class="grid grid-cols-4 gap-4 h-[20vh]">
      <div class="stat-card">
        <div class="stat-icon">
          <img src="/public/imgs/List/list_icon_1.png" alt="" class="h-16">
        </div>
        <div class="stat-content">
          <h3>Total de Questões</h3>
          <p class="stat-number">{{ stats.totalQuestions }}</p>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon">
          <img src="/public/imgs/List/list_icon_2.png" alt="" class="h-16">
        </div>
        <div class="stat-content">
          <h3>Listas Criadas</h3>
          <p class="stat-number">{{ stats.totalLists }}</p>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon">
          <img src="/public/imgs/List/list_icon_3.png" alt="" class="h-16">
        </div>
        <div class="stat-content">
          <h3>Questões Respondidas</h3>
          <p class="stat-number">{{ stats.answeredQuestions }}</p>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon">
          <img src="/public/imgs/correct.svg" alt="" class="h-16">
        </div>
        <div class="stat-content">
          <h3>Taxa de Acerto</h3>
          <p class="stat-number">{{ stats.successRate }}%</p>
        </div>
      </div>
    </section>

    <!-- Conteúdo Principal -->
    <section class="grid grid-cols-2 gap-6 flex-1">
      <!-- Listas Recentes -->
      <div class="dashboard-section">
        <h2 class="section-title">Listas Recentes</h2>
        <ul class="space-y-3">
          <li v-for="list in recentLists" :key="list.id" class="list-item">
            <div class="flex justify-between items-center">
              <div>
                <h3 class="text-lg font-medium text-black">{{ list.name }}</h3>
                <p class="text-sm text-gray-600">{{ list.questions }} questões</p>
              </div>
              <div class="text-right">
                <p class="text-sm text-gray-500">{{ list.date }}</p>
                <button class="action-btn mt-1">Ver Lista</button>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <!-- Atividade Recente -->
      <div class="dashboard-section">
        <h2 class="section-title">Atividade Recente</h2>
        <ul class="space-y-3">
          <li v-for="(activity, index) in recentActivity" :key="index" class="activity-item">
            <div class="flex items-start gap-3">
              <div class="activity-dot"></div>
              <div class="flex-1">
                <p class="text-black font-medium">{{ activity.action }}</p>
                <p class="text-sm text-gray-500">{{ activity.date }} às {{ activity.time }}</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </section>

    <!-- Seção de Progresso -->
    <section class="progress-section">
      <h2 class="section-title mb-4">Seu Progresso</h2>
      <div class="progress-content">
        <div class="progress-text">
          <p class="text-lg text-black">Continue praticando para melhorar seus resultados!</p>
          <p class="text-gray-600 mt-2">Você já respondeu {{ stats.answeredQuestions }} de {{ stats.totalQuestions }} questões disponíveis.</p>
        </div>
        <div class="progress-bar-container">
          <div class="progress-bar" :style="{ width: `${(stats.answeredQuestions / stats.totalQuestions) * 100}%` }"></div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.stat-card {
  background-color: #F4F4F4;
  border: 0.5px solid #979494;
  border-radius: 20px;
  filter: drop-shadow(4px 4px 10px #8b8b8b);
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: transform 0.2s;
}

.stat-card:hover {
  transform: translateY(-2px);
  filter: drop-shadow(4px 6px 12px #8b8b8b);
}

.stat-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.stat-content {
  flex: 1;
}

.stat-content h3 {
  color: #1D3F69;
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.stat-number {
  color: #892E2F;
  font-size: 2rem;
  font-weight: bold;
}

.dashboard-section {
  background-color: #F4F4F4;
  border: 0.5px solid #979494;
  border-radius: 20px;
  filter: drop-shadow(4px 4px 10px #8b8b8b);
  padding: 2rem;
  overflow-y: auto;
}

.section-title {
  color: #892E2F;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
}

.list-item {
  background-color: white;
  border-radius: 15px;
  padding: 1rem;
  filter: drop-shadow(0px 2px 4px #b0b0b0);
  transition: transform 0.2s;
}

.list-item:hover {
  transform: translateX(4px);
}

.action-btn {
  background: linear-gradient(180deg, #6686AF, #1D3F69);
  color: white;
  padding: 0.4rem 1rem;
  border-radius: 10px;
  font-size: 0.85rem;
  transition: opacity 0.2s;
}

.action-btn:hover {
  opacity: 0.9;
  cursor: pointer;
}

.activity-item {
  background-color: white;
  border-radius: 15px;
  padding: 1rem;
  filter: drop-shadow(0px 2px 4px #b0b0b0);
}

.activity-dot {
  width: 12px;
  height: 12px;
  background: linear-gradient(180deg, #540D1B, #AA4243);
  border-radius: 50%;
  margin-top: 4px;
  flex-shrink: 0;
}

.progress-section {
  background: linear-gradient(180deg, rgba(170,66,67,1) 0%, rgba(68,26,27,1) 100%);
  border-radius: 20px;
  padding: 2rem;
  min-height: 150px;
}

.progress-section .section-title {
  color: white;
}

.progress-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.progress-text p {
  color: white;
}

.progress-bar-container {
  width: 100%;
  height: 30px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 15px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #6686AF, #1D3F69);
  border-radius: 15px;
  transition: width 0.5s ease;
}
</style>