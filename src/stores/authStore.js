import { defineStore } from 'pinia'
import api from '@/utils/axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    error: null
  }),

  actions: {
    // Fungsi login dengan pencocokan username dan password
    async login(username, password) {
      try {
        const res = await api.get(`/users?username=${username}&password=${password}`)

        if (res.data.length > 0) {
          this.user = res.data[0]
          this.error = null
          return true
        } else {
          this.error = 'Username atau password salah'
          return false
        }
      } catch (err) {
        this.error = 'Terjadi kesalahan koneksi saat login.'
        console.error(err)
        return false
      }
    },

    // Fungsi logout
    logout() {
      this.user = null
    },

    // Fungsi set user saat data berhasil diubah (nama, username, password)
    setUser(userData) {
      this.user = userData
    },

    // Fungsi memperbarui data user (nama, username, password)
    async updateUserData(updateData) {
      try {
        if (!this.user || !this.user.id) {
          throw new Error('User belum login.')
        }

        const res = await api.patch(`/users/${this.user.id}`, updateData)
        this.user = res.data
        return { success: true }
      } catch (err) {
        console.error('Gagal update user:', err.response?.data || err.message)
        return {
          success: false,
          message: 'Gagal memperbarui data.'
        }
      }
    }
  }
})
