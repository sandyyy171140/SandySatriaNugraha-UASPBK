<template>
  <div class="daily-log-page">
    <div class="header-container">
      <CalendarDays class="header-icon" />
      <div>
        <h1>Log Harian</h1>
        <p class="sub-title">Checklist kebiasaanmu untuk hari ini.</p>
      </div>
    </div>

    <div class="card">
      <ul v-if="habits.length > 0" class="habit-list">
        <li
          v-for="habit in habits"
          :key="habit.id"
          class="habit-item"
          :class="{ completed: isChecked(habit.id) }"
        >
          <label class="checkbox-label">
            <input
              type="checkbox"
              :checked="isChecked(habit.id)"
              @change="toggle(habit.id)"
            />
            <span class="custom-checkbox">
              <Check class="checkmark" />
            </span>
            <span class="habit-title">{{ habit.title }}</span>
          </label>
          <span class="tag">{{ habit.category }}</span>
        </li>
      </ul>
      <div v-else class="empty-state-container">
        <p class="empty-state">Belum ada kebiasaan. Silakan tambah di Dashboard.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useHabitStore } from '@/stores/habitStore'
import { useLogStore } from '@/stores/logStore'
import { CalendarDays, Check } from 'lucide-vue-next'

const habitStore = useHabitStore()
const logStore = useLogStore()

onMounted(async () => {
  await habitStore.fetchHabits()
  await logStore.fetchLogs()
})

const habits = computed(() => habitStore.habits)
const today = new Date().toISOString().slice(0, 10)

const isChecked = (habitId) => {
  return logStore.logs.some(log => log.habitId === habitId && log.date === today)
}

const toggle = async (habitId) => {
  const found = logStore.logs.find(log => log.habitId === habitId && log.date === today)
  if (found) {
    // Hapus log jika sudah ada
    await logStore.removeLog(found.id)
  } else {
    // Tambah log jika belum ada
    await logStore.addLog({ habitId, date: today })
  }
}
</script>

<style scoped>
.daily-log-page {
  max-width: 800px;
  margin: 0 auto;
}
.header-container {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
}
.header-icon {
  width: 48px;
  height: 48px;
  color: var(--primary);
}
h1 { margin-bottom: 0.25rem; }
.sub-title { color: var(--muted-foreground); font-size: 1.1rem; }

.card {
  background: var(--card);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  overflow: hidden;
}
.habit-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.habit-item {
  display: flex;
  align-items: center;
  padding: 0 1.5rem;
  border-bottom: 1px solid var(--border);
  transition: background-color 0.3s ease;
}
.habit-item:last-child {
  border-bottom: none;
}
.habit-item:hover {
  background-color: var(--muted);
}
.checkbox-label {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-grow: 1;
  padding: 1rem 0;
  cursor: pointer;
}
input[type="checkbox"] {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}
.custom-checkbox {
  width: 22px;
  height: 22px;
  border: 2px solid var(--border);
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  flex-shrink: 0;
}
.checkmark {
  width: 16px;
  height: 16px;
  color: var(--primary-foreground);
  opacity: 0;
  transform: scale(0.5);
  transition: all 0.3s cubic-bezier(0.18, 0.89, 0.32, 1.28);
}
.habit-title {
  font-size: 1.1rem;
  font-weight: 500;
  position: relative;
}
.habit-title::after {
  content: '';
  position: absolute;
  left: 0;
  top: 55%;
  height: 2px;
  background-color: var(--muted-foreground);
  width: 100%;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.4s ease;
}
.tag {
  background: var(--muted);
  color: var(--muted-foreground);
  padding: 0.25rem 0.6rem;
  border-radius: 99px;
  font-size: 0.8rem;
  margin-left: auto;
}

/* STATE: Completed */
.habit-item.completed {
  background-color: hsl(145, 75%, 98%);
}
.habit-item.completed .custom-checkbox {
  background-color: var(--accent);
  border-color: var(--accent);
}
.habit-item.completed .checkmark {
  opacity: 1;
  transform: scale(1);
}
.habit-item.completed .habit-title {
  color: var(--muted-foreground);
}
.habit-item.completed .habit-title::after {
  transform: scaleX(1);
}

/* DARK MODE */
[data-theme="dark"] .habit-item.completed {
  background-color: rgba(52, 211, 153, 0.1);
}
[data-theme="dark"] .tag {
  background-color: var(--border);
}

.empty-state-container {
  padding: 3rem;
  text-align: center;
}
.empty-state {
  color: var(--muted-foreground);
  font-size: 1.1rem;
}
</style>
