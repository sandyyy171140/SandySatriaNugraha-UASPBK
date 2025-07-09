<template>
  <div class="settings">
    <h1>Pengaturan</h1>

    <div class="card">
      <h3>
        <UserCircle class="card-icon" />
        Informasi Akun
      </h3>
      <form @submit.prevent="updateUser">
        <div class="form-group">
          <label for="name">Nama Lengkap</label>
          <input id="name" v-model="form.name" type="text" placeholder="Nama kamu..." />
        </div>

        <div class="form-group">
          <label for="username">Username</label>
          <input id="username" v-model="form.username" type="text" placeholder="Username kamu..." />
        </div>

        <div class="form-group">
          <label for="password">Password Baru (Opsional)</label>
          <input id="password" v-model="form.password" type="password" placeholder="••••••" />
        </div>

        <div class="form-group">
          <label for="confirm">Konfirmasi Password</label>
          <input id="confirm" v-model="form.confirm" type="password" placeholder="Ulangi password" />
        </div>

        <button type="submit">
          <Save />
          Simpan Perubahan
        </button>
      </form>
    </div>

    <div class="card">
      <h3>
        <Palette class="card-icon" />
        Mode Tampilan
      </h3>
      <ToggleDark />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import api from '@/utils/axios'
import ToggleDark from '@/components/ToggleDark.vue'
import { UserCircle, Save, Palette } from 'lucide-vue-next'

const auth = useAuthStore()

const form = ref({
  name: '',
  username: '',
  password: '',
  confirm: ''
})

onMounted(() => {
  form.value.name = auth.user?.name ?? ''
  form.value.username = auth.user?.username ?? ''
})

const updateUser = async () => {
  if (!auth.user?.id) {
    alert('User belum login.')
    return
  }

  if (form.value.password && form.value.password !== form.value.confirm) {
    alert('Password dan konfirmasi tidak cocok!')
    return
  }

  const update = {}
  if (form.value.name && form.value.name !== auth.user.name) {
    update.name = form.value.name
  }
  if (form.value.username && form.value.username !== auth.user.username) {
    update.username = form.value.username
  }
  if (form.value.password) {
    update.password = form.value.password
  }

  if (Object.keys(update).length === 0) {
    alert('Tidak ada data yang diubah.')
    return
  }

  try {
    const res = await api.patch(`/users/${auth.user.id}`, update)
    auth.setUser(res.data)
    alert('✅ Data berhasil diperbarui!')
    form.value.password = ''
    form.value.confirm = ''
  } catch (err) {
    console.error('Update error:', err.response?.data || err.message)
    alert('❌ Gagal memperbarui data.')
  }
}
</script>

<style scoped>
.settings {
  max-width: 700px;
  margin: 0 auto;
}
h1 {
  margin-bottom: 2rem;
}
.card {
  background: var(--card);
  border-radius: var(--radius);
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: var(--shadow);
}
.card h3 {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
}
.card-icon {
  color: var(--primary);
}
.form-group {
  margin-bottom: 1.5rem;
}
label {
  font-weight: 500;
  display: block;
  margin-bottom: 0.5rem;
  color: var(--foreground);
}
input {
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  border-radius: var(--radius);
  border: 1px solid var(--border);
}
button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #646cff;
  color: white;
  border: none;
  padding: 0.75rem 1.25rem;
  border-radius: var(--radius);
  font-size: 1rem;
  cursor: pointer;
  transition: 0.3s;
}
button:hover {
  background: #4f55e6;
}
</style>
