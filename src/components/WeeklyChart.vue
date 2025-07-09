<template>
  <div class="chart-container card">
    <div class="header">
      <BarChartBig class="header-icon" />
      <h3>Statistik Mingguan</h3>
    </div>
    <div v-if="isReady" class="chart-wrapper">
      <Bar :data="chartData" :options="chartOptions" />
    </div>
    <div v-else class="empty-state">
      <AreaChart class="empty-icon" />
      <p class="empty-title">Belum Ada Data</p>
      <p class="empty-description">Selesaikan beberapa kebiasaan untuk melihat statistik Anda di sini.</p>
    </div>
  </div>
</template>

<script setup>
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { ref, onMounted, watch } from 'vue';
import { useLogStore } from '@/stores/logStore';
import { useHabitStore } from '@/stores/habitStore';
// --- PERUBAHAN: Import ikon baru ---
import { BarChartBig, AreaChart } from 'lucide-vue-next';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const chartData = ref({});
const isReady = ref(false);

// --- PERUBAHAN: Opsi chart yang lebih modern ---
const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false, // Judul sekarang kita taruh di luar chart
    },
    // Kustomisasi tooltip agar sesuai tema
    tooltip: {
      backgroundColor: 'var(--card)',
      titleColor: 'var(--primary)',
      bodyColor: 'var(--foreground)',
      borderColor: 'var(--border)',
      borderWidth: 1,
      padding: 10,
      boxPadding: 4,
    },
  },
  // Kustomisasi garis dan skala
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        color: 'var(--border)', // Warna garis grid
        drawBorder: false,
      },
      ticks: {
        color: 'var(--muted-foreground)', // Warna teks di sumbu Y
        precision: 0, // Hanya tampilkan angka bulat
      },
    },
    x: {
      grid: {
        display: false, // Hilangkan garis grid vertikal
      },
      ticks: {
        color: 'var(--muted-foreground)', // Warna teks di sumbu X
      },
    },
  },
});

const logStore = useLogStore();
const habitStore = useHabitStore();

const getLast7Days = () => {
  const days = [];
  const today = new Date();
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    days.push(date.toISOString().slice(0, 10));
  }
  return days;
};

const updateChart = () => {
  const days = getLast7Days();
  const logsByDate = logStore.getLogsByDate;
  
  // Cek apakah ada data log sama sekali
  if (Object.keys(logsByDate).length === 0) {
      isReady.value = false;
      return;
  }

  // --- PERUBAHAN: Ambil warna dari CSS variables ---
  const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim();
  const mutedColor = getComputedStyle(document.documentElement).getPropertyValue('--muted').trim();

  chartData.value = {
    labels: days,
    datasets: [
      {
        label: 'Kebiasaan Selesai',
        data: days.map(d => logsByDate[d] || 0),
        backgroundColor: primaryColor,
        borderColor: primaryColor,
        borderWidth: 1,
        borderRadius: 8, // Membuat bar memiliki sudut membulat
        hoverBackgroundColor: mutedColor,
      },
    ],
  };

  isReady.value = true;
};

onMounted(async () => {
  await habitStore.fetchHabits();
  await logStore.fetchLogs();
  updateChart();
});

// Auto update saat logStore.logs berubah
watch(() => logStore.logs, updateChart, { deep: true });
</script>

<style scoped>
/* Kontainer utama dengan style kartu */
.chart-container {
  background: var(--card);
  padding: 1.5rem;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
}

.header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  padding: 0 0.5rem;
}

.header-icon {
  width: 28px;
  height: 28px;
  color: var(--primary);
}
.header h3 {
    font-size: 1.5rem;
    margin: 0;
}

/* Pembungkus chart agar bisa mengatur tinggi */
.chart-wrapper {
  position: relative;
  height: 350px;
}

/* --- STYLE BARU: Tampilan saat data kosong --- */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 350px;
  text-align: center;
  color: var(--muted-foreground);
}
.empty-icon {
  width: 60px;
  height: 60px;
  margin-bottom: 1rem;
  opacity: 0.5;
}
.empty-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--foreground);
}
.empty-description {
  max-width: 300px;
}
</style>