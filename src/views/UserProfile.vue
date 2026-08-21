<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Bar, Doughnut } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  type ChartData,
  type ChartOptions
} from 'chart.js'
// 1. IMPORTAR O PLUGIN
import ChartDataLabels from 'chartjs-plugin-datalabels';
import TheCard from '@/components/ui/TheCard.vue';
import { questionOptionRepository } from '@/repositories/answerRepository';
import type { UserPerformance, UserOverallPerformance } from '@/models/Answer';

// 2. REGISTRAR O PLUGIN GLOBALMENTE
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement, 
  Title,
  Tooltip,
  Legend,
  ChartDataLabels // Adicionado aqui
)

// --- DADOS DO GRÁFICO DE BARRAS (Por Matéria) ---
const performanceData = ref<UserPerformance[]>([])

const chartData = computed<ChartData<'bar'>>(() => ({
  labels: performanceData.value.map(p => p.subject.name),
  datasets: [
    {
      label: 'Taxa de acerto (%)',
      backgroundColor: '#42b883',
      data: performanceData.value.map(p => p.percentualCorrect)
    }
  ]
}))

const chartOptions = ref<ChartOptions<'bar'>>({
  responsive: true,
  maintainAspectRatio: false,
  // Dica: Para não confundir, desabilitamos os datalabels no gráfico de barras
  plugins: {
    datalabels: { display: false }
  }
})

const overallPerformance = ref<UserOverallPerformance | null>(null)

const donutChartData = computed<ChartData<'doughnut'>>(() => {
  if (!overallPerformance.value) {
    return { labels: [], datasets: [] }
  }

  const correct = overallPerformance.value.totalCorrect
  const incorrect = overallPerformance.value.totalAnswers - correct

  return {
    labels: ['Corretas', 'Incorretas'],
    datasets: [
      {
        backgroundColor: ['#42b883', '#f87979'],
        data: [correct, incorrect]
      }
    ]
  }
})

// 3. CONFIGURAR O PLUGIN NO GRÁFICO DE ROSCA
const donutChartOptions = computed<ChartOptions<'doughnut'>>(() => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
    },
    // Configurações do Plugin datalabels
    datalabels: {
      display: true, // Força a exibição sempre
      color: '#fff', // Cor da fonte dentro da fatia
      fontWeight: 'bold',
      font: {
        size: 16
        },
      // Função para formatar o que será escrito
      formatter: (value: number, ctx: any) => {
        // value é o número absoluto (ex: 15 ou 64)
        
        // Se quiser mostrar o número absoluto, descomente a linha abaixo:
        // return value;

        // Se quiser mostrar a porcentagem da fatia:
        const datasets = ctx.chart.data.datasets;
        if (datasets.length > 0) {
            // Soma o total do dataset atual ([15, 64] = 79)
            const total = datasets[0].data.reduce((a: number, b: number) => a + b, 0);
            // Calcula a porcentagem desta fatia
            const percentage = ((value * 100) / total).toFixed(1) + '%';
            return percentage;
        }
        return '';
      },
    }
  }
}))

// --- CICLO DE VIDA ---
onMounted(async () => {
  try {
    // Simulando API - mantenho o mock que você enviou
    const res = await questionOptionRepository.getPerformance()
    performanceData.value = res.data || []

  const overallRes = await questionOptionRepository.getOverallPerformance()
  overallPerformance.value = overallRes.data || null    

    
  } catch (err) {
    console.error("Erro ao buscar performance:", err)
    performanceData.value = []
  }
})
</script>

<template>
  <div class="w-full flex flex-col items-center px-24 py-12">
    <h2 class="text-3xl font-bold mb-8 text-black w-full">
      Seu Desempenho Geral
    </h2>
    <div class="w-full flex justify-around items-center">
      <TheCard title="Quantidade de Respostas" inside-class="items-center h-full">
        <h3 class="text-black text-7xl my-6">{{ overallPerformance?.totalAnswers || 0 }}</h3>
      </TheCard>

      <div style="width: 400px; height: 400px;" v-if="overallPerformance">
        <Doughnut :data="donutChartData" :options="donutChartOptions" />
      </div>
    </div>
    

    <div style="width: 100%; height: 500px;">
      <h3 class="text-black text-2xl" style="margin-bottom: 10px;">Desempenho por Matéria</h3>
      <Bar :data="chartData" :options="chartOptions" />
    </div>

  </div>
</template>