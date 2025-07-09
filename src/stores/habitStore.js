import { defineStore } from 'pinia'
import api from '@/utils/axios'
import { useAuthStore } from './authStore'

export const useHabitStore = defineStore('habit', {
  state: () => ({
    habits: [],
    error: null,
    loading: false,
  }),

  actions: {
    async fetchHabits() {
      const auth = useAuthStore()
      if (!auth.user || !auth.user.id) return

      this.loading = true
      try {
        const res = await api.get(`/habits?userId=${auth.user.id}`)
        this.habits = res.data
        this.error = null
      } catch (err) {
        console.error('Gagal memuat data habits:', err)
        this.error = 'Gagal memuat data kebiasaan.'
      } finally {
        this.loading = false
      }
    },

    async addHabit(habit) {
      const auth = useAuthStore()
      habit.userId = auth.user.id
      try {
        const res = await api.post('/habits', habit)
        this.habits.push(res.data)
      } catch (err) {
        console.error('Gagal menambah kebiasaan:', err)
        this.error = 'Tidak bisa menambahkan kebiasaan.'
      }
    },

    async deleteHabit(id) {
      try {
        await api.delete(`/habits/${id}`)
        this.habits = this.habits.filter(h => h.id !== id)
      } catch (err) {
        console.error('Gagal menghapus kebiasaan:', err)
        this.error = 'Tidak bisa menghapus kebiasaan.'
      }
    },

    async updateHabit(updatedHabit) {
      try {
        const res = await api.put(`/habits/${updatedHabit.id}`, updatedHabit)
        const idx = this.habits.findIndex(h => h.id === updatedHabit.id)
        if (idx !== -1) this.habits[idx] = res.data
      } catch (err) {
        console.error('Gagal mengupdate kebiasaan:', err)
        this.error = 'Tidak bisa memperbarui kebiasaan.'
      }
    },
  },
})
