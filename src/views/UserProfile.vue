<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  type ChartData,
  type ChartOptions
} from 'chart.js'
import { questionOptionRepository } from '@/repositories/answerRepository';
import type { UserPerformance } from '@/models/Answer';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

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
  maintainAspectRatio: false
})

onMounted(async () => {
  try {
    const res = await questionOptionRepository.getPerformance()
    performanceData.value = res.data || []
    console.log(performanceData.value)
  } catch (err) {
    console.error("Erro ao buscar performance:", err)
    performanceData.value = []
  }
})
</script>

<template>
    <div style="width: 600px; height: 400px;">
        <Bar :data="chartData" :options="chartOptions" />
    </div>
</template>