<template>
  <aside class="sidebar" :class="{ 'is-open': isOpen }">
    <button class="close-menu" @click="$emit('closeMenu')">
      <X />
    </button>
    
    <div class="logo-container">
      <Zap />
      <h2>FitLife</h2>
    </div>
    <nav>
      <RouterLink to="/" @click="$emit('closeMenu')">
        <LayoutDashboard />
        <span>Dashboard</span>
      </RouterLink>
      <RouterLink to="/daily-log" @click="$emit('closeMenu')">
        <CalendarCheck />
        <span>Daily Log</span>
      </RouterLink>
      <RouterLink to="/analytics" @click="$emit('closeMenu')">
        <BarChart2 />
        <span>Analytics</span>
      </RouterLink>
      <RouterLink to="/settings" @click="$emit('closeMenu')">
        <Settings />
        <span>Settings</span>
      </RouterLink>
    </nav>
    <div class="sidebar-footer">
      <button @click="logout" class="logout-button">
        <LogOut />
        <span>Logout</span>
      </button>
    </div>
  </aside>
</template>

<script setup>
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'vue-router';
import { LayoutDashboard, CalendarCheck, BarChart2, Settings, LogOut, Zap, X } from 'lucide-vue-next';

// RESPONSIVE: Menerima props untuk status terbuka & emit untuk menutup
defineProps({
  isOpen: Boolean
});
defineEmits(['closeMenu']);

const auth = useAuthStore();
const router = useRouter();

const logout = () => {
  auth.logout();
  router.push('/login');
};
</script>

<style scoped>
.sidebar {
  width: 240px;
  height: 100vh;
  background: var(--card);
  color: var(--foreground);
  padding: 1.5rem;
  position: fixed;
  left: 0;
  top: 0;
  border-right: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease;
  z-index: 1000;
}
.logo-container {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0 0.5rem;
  margin-bottom: 2.5rem;
}
.logo-container h2 { font-size: 1.5rem; font-weight: 700; }
.logo-container svg { color: var(--primary); width: 28px; height: 28px; }

nav { display: flex; flex-direction: column; gap: 0.5rem; }
nav a {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 1rem;
  border-radius: var(--radius);
  color: var(--muted-foreground);
  font-weight: 500;
  text-decoration: none;
  transition: background-color 0.2s, color 0.2s;
}
nav a:hover { background-color: var(--muted); color: var(--foreground); }
nav a.router-link-exact-active { background-color: var(--primary); color: var(--primary-foreground); }
.sidebar-footer { margin-top: auto; }
.logout-button {
  background: none;
  color: var(--muted-foreground);
  width: 100%;
  justify-content: flex-start;
  padding: 0.75rem 1rem;
}
.logout-button:hover { background-color: var(--muted); color: var(--foreground); }
.close-menu {
  display: none;
}

/* --- Responsive Styles --- */
@media (max-width: 768px) {
  .sidebar {
    transform: translateX(-100%);
  }
  .sidebar.is-open {
    transform: translateX(0);
    box-shadow: 0 0 25px rgba(0,0,0,0.2);
  }
  .close-menu {
    display: inline-flex;
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: var(--muted);
    color: var(--muted-foreground);
    border-radius: 50%;
    padding: 0.5rem;
  }
}
</style>