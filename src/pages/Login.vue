<template>
  <div class="login-page">
    <div class="login-box">
      <div class="header">
        <LogIn class="logo-icon" />
        <h1>Selamat Datang</h1>
        <p>Login ke akun FitLife Anda untuk melanjutkan.</p>
      </div>
      <form @submit.prevent="handleLogin">
        <div class="input-group">
          <User class="input-icon" />
          <input v-model="username" type="text" placeholder="Username" required />
        </div>
        <div class="input-group">
          <Lock class="input-icon" />
          <input v-model="password" type="password" placeholder="Password" required />
        </div>
        <button type="submit">
          <LogIn />
          Masuk
        </button>
      </form>
      <p v-if="auth.error" class="error-msg">{{ auth.error }}</p>
    </div>
  </div>
</template>

<script setup>
// Script tidak berubah
import { ref } from 'vue';
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'vue-router';
import { LogIn, User, Lock } from 'lucide-vue-next';
const username = ref('');
const password = ref('');
const auth = useAuthStore();
const router = useRouter();
const handleLogin = async () => {
  const success = await auth.login(username.value, password.value);
  if (success) {
    router.push('/');
  }
};
</script>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 1rem;
}
.login-box {
  background: var(--card);
  padding: 2.5rem 3rem;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  max-width: 420px;
  width: 100%;
  border-top: 4px solid var(--primary);
}
.header { text-align: center; margin-bottom: 2rem; }
.logo-icon { width: 48px; height: 48px; color: var(--primary); margin-bottom: 1rem; }
h1 { margin-bottom: 0.5rem; font-size: 1.8rem; }
p { color: var(--muted-foreground); margin-bottom: 0; }
form { display: flex; flex-direction: column; gap: 1.5rem; }
.input-group { position: relative; }
.input-icon { position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); color: var(--muted-foreground); width: 20px; height: 20px; }

/* --- PERBAIKAN DI SINI --- */
/* Selector diubah dari 'input' menjadi '.input-group input' agar lebih spesifik */
.input-group input { 
  padding-left: 3rem; 
}

.error-msg { margin-top: 1.5rem; color: #ef4444; font-weight: 500; text-align: center; }

/* --- Responsive Styles --- */
@media (max-width: 480px) {
  .login-box {
    padding: 2rem 1.5rem;
  }
  h1 {
    font-size: 1.5rem;
  }
}

/* FIX untuk tombol di baris sebelumnya */
form button :deep(svg) {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}
</style>