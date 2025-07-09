<template>
  <div class="analytics">
    <h1>📊 Statistik Kebiasaan Mingguan</h1>
    <WeeklyChart :chartData="chartData" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useLogStore } from '@/stores/logStore'
import WeeklyChart from '@/components/WeeklyChart.vue'

const chartData = ref({
  labels: [],
  datasets: [
    {
      label: 'Total Habit',
      backgroundColor: '#4e73df',
      data: []
    }
  ]
})

const logStore = useLogStore()

const getWeekDates = () => {
  const dates = []
  const today = new Date()
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today)
    d.setDate(today.getDate() - i)
    dates.push(d.toISOString().slice(0, 10))
  }
  return dates
}

const prepareChartData = () => {
  const weekDates = getWeekDates()
  const logs = logStore.logs

  const data = weekDates.map(date =>
    logs.filter(log => log.date === date).length
  )

  chartData.value.labels = weekDates
  chartData.value.datasets[0].data = data
}

onMounted(async () => {
  await logStore.fetchLogs()
  prepareChartData()
})
</script>

<style scoped>
.analytics {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}
</style>
