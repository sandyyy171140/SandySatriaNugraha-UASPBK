<template>
  <div class="log-form">
    <h2>📝 Checklist Kebiasaan Hari Ini</h2>
    <ul>
      <li v-for="habit in habits" :key="habit.id">
        <label>
          <input
            type="checkbox"
            :checked="isLogged(habit.id)"
            @change="toggleLog(habit.id)"
            :disabled="isLogged(habit.id)"
          />
          {{ habit.name }}
        </label>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useHabitStore } from '@/stores/habitStore'
import { useLogStore } from '@/stores/logStore'

const habitStore = useHabitStore()
const logStore = useLogStore()

const today = new Date().toISOString().slice(0, 10)

const isLogged = (habitId) => {
  return logStore.logs.some(log => log.habitId === habitId && log.date === today)
}

const toggleLog = async (habitId) => {
  if (!isLogged(habitId)) {
    await logStore.addLog({
      userId: habitStore.habits[0]?.userId || 1,
      habitId,
      date: today
    })
    alert('Log berhasil dicatat!')
  }
}
</script>

<style scoped>
ul {
  list-style: none;
  padding: 0;
}
li {
  margin: 0.5rem 0;
}
</style>
