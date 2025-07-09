<template>
  <div class="dashboard">
    <h1>Dashboard</h1>

    <!-- Kartu Streak -->
    <div class="streak-card" :class="rewardClass">
      <Flame class="icon" />
      <div class="text-content">
        <h2>{{ streak }} Hari Beruntun!</h2>
        <p>{{ streakMessage }}</p>
      </div>
    </div>

    <div class="grid-container">
      <!-- Form Tambah -->
      <div class="card">
        <h3><PlusCircle class="card-icon" />Tambah Kebiasaan Baru</h3>
        <form @submit.prevent="addHabit" class="add-habit-form">
          <div class="form-group">
            <label>Nama Kebiasaan</label>
            <div class="input-wrapper">
              <Target class="input-icon" />
              <input v-model="newHabit.title" placeholder="Cth: Olahraga Pagi" required />
            </div>
          </div>
          <div class="form-group">
            <label>Kategori</label>
            <CustomSelect v-model="newHabit.category" :options="categoryOptions" placeholder="Pilih kategori" />
          </div>
          <button type="submit" class="submit-button">
            <Plus /> Tambah Kebiasaan
          </button>
        </form>
      </div>

      <!-- Daftar Habit -->
      <div class="card">
        <h3><ClipboardList class="card-icon" />Daftar Kebiasaanmu</h3>
        <ul v-if="habits.length > 0">
          <li v-for="habit in habits" :key="habit.id" class="habit-item">
            <div class="habit-info">
              <span class="habit-title">{{ habit.title }}</span>
              <span class="tag">{{ habit.category }}</span>
            </div>
            <button class="delete-btn" @click="deleteHabit(habit.id)" title="Hapus kebiasaan">
              <Trash2 class="delete-icon" />
            </button>
          </li>
        </ul>
        <p v-else class="empty-state">Belum ada kebiasaan yang ditambahkan.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useHabitStore } from '@/stores/habitStore'
import { useLogStore } from '@/stores/logStore'
import { useAuthStore } from '@/stores/authStore'
import { Flame, PlusCircle, ClipboardList, Target, Plus, Trash2 } from 'lucide-vue-next'
import CustomSelect from '@/components/CustomSelect.vue'

const habitStore = useHabitStore()
const logStore = useLogStore()
const auth = useAuthStore()
const habits = ref([])
const streak = ref(0)
const newHabit = ref({ title: '', category: '' })
const categoryOptions = ref(['Kesehatan', 'Kebugaran', 'Produktivitas'])

onMounted(async () => {
  await habitStore.fetchHabits()
  await logStore.fetchLogs()
  habits.value = habitStore.habits
  streak.value = logStore.getStreak()
})

const rewardClass = computed(() => {
  if (streak.value >= 7) return 'gold'
  if (streak.value >= 3) return 'bronze'
  return 'default'
})
const streakMessage = computed(() => {
  if (streak.value >= 7) return 'Luar biasa! Terus pertahankan performa emasmu.'
  if (streak.value >= 3) return 'Kerja bagus! Sedikit lagi menuju pencapaian baru.'
  return 'Ayo mulai hari ini dan bangun kebiasaan baikmu!'
})

const addHabit = async () => {
  if (!newHabit.value.title || !newHabit.value.category) return
  await habitStore.addHabit({ ...newHabit.value, userId: auth.user.id })
  newHabit.value.title = ''
  newHabit.value.category = ''
  await habitStore.fetchHabits()
  habits.value = habitStore.habits
}

const deleteHabit = async (id) => {
  if (confirm('Yakin ingin menghapus kebiasaan ini?')) {
    await habitStore.deleteHabit(id)
    await habitStore.fetchHabits()
    habits.value = habitStore.habits
  }
}
</script>

<style scoped>
h1 { margin-bottom: 2rem; }
.streak-card {
  border-radius: var(--radius); padding: 1.5rem 2rem; margin-bottom: 2.5rem;
  box-shadow: var(--shadow); display: flex; align-items: center; gap: 1.5rem;
  border-left: 6px solid;
}
.streak-card .icon { width: 40px; height: 40px; }
.streak-card.default { background-color: var(--card); border-color: #94a3b8; }
.streak-card.bronze { background-color: #fff7ed; border-color: #fb923c; }
.streak-card.gold { background-color: #fefce8; border-color: #facc15; }
[data-theme="dark"] .streak-card.bronze { background-color: #43210b; }
[data-theme="dark"] .streak-card.gold { background-color: #42350b; }

.streak-card h2 { margin: 0; font-size: 1.6rem; }
.streak-card p { font-size: 1rem; color: var(--muted-foreground); margin-top: 0.25rem; }

.grid-container {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 2rem;
}
.card {
  background: var(--card); padding: 2rem; border-radius: var(--radius);
  box-shadow: var(--shadow);
}
.card h3 {
  display: flex; align-items: center; gap: 0.75rem;
  margin-bottom: 1.5rem;
}
.card-icon { width: 24px; height: 24px; color: var(--primary); }

.card ul {
  list-style: none; padding: 0;
  display: flex; flex-direction: column; gap: 1rem;
}
.habit-item {
  display: flex; justify-content: space-between; align-items: center;
  background: var(--muted); padding: 0.75rem 1rem;
  border-radius: calc(var(--radius) - 4px);
}
.habit-info {
  display: flex; flex-direction: column;
}
.habit-title {
  font-weight: 600;
}
.tag {
  background: var(--background);
  color: var(--muted-foreground);
  padding: 0.25rem 0.6rem;
  border-radius: 99px;
  font-size: 0.8rem;
  font-weight: 500;
  margin-top: 0.2rem;
}

.delete-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  color: #e74c3c;
  transition: color 0.2s;
}
.delete-btn:hover {
  color: #c0392b;
}
.delete-icon {
  width: 20px; height: 20px;
}

.empty-state {
  color: var(--muted-foreground); text-align: center; padding: 2rem;
}

.add-habit-form {
  display: flex; flex-direction: column; gap: 1.25rem;
}
.form-group label {
  display: block; font-weight: 500; margin-bottom: 0.5rem; color: var(--muted-foreground);
}
.input-wrapper {
  position: relative;
}
.input-wrapper .input-icon {
  position: absolute; left: 1rem; top: 50%; transform: translateY(-50%);
  color: var(--muted-foreground); width: 20px; height: 20px;
}
.add-habit-form .input-wrapper input {
  padding-left: 3rem;
}

@media (max-width: 768px) {
  h1 { font-size: 1.8rem; }
  .streak-card {
    padding: 1.5rem; flex-direction: column; text-align: center; gap: 1rem;
  }
  .streak-card h2 { font-size: 1.4rem; }
  .grid-container { grid-template-columns: 1fr; }
  .card { padding: 1.5rem; }
}
</style>
