<template>
  <router-view />
</template>

<script setup>
import { onMounted } from 'vue'
import { useHabitStore } from '@/stores/habitStore'
import { useLogStore } from '@/stores/logStore'

const habitStore = useHabitStore()
const logStore = useLogStore()

onMounted(() => {
  habitStore.fetchHabits()
  logStore.fetchLogs()
})
</script>
