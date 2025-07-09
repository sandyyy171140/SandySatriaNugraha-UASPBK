<template>
  <div class="main-layout">
    <button class="hamburger-menu" @click="isMobileMenuOpen = true">
      <Menu />
    </button>
    
    <Sidebar :is-open="isMobileMenuOpen" @close-menu="isMobileMenuOpen = false" />
    
    <div v-if="isMobileMenuOpen" class="overlay" @click="isMobileMenuOpen = false"></div>

    <main class="content">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Sidebar from '@/components/Sidebar.vue';
import { Menu } from 'lucide-vue-next';

const isMobileMenuOpen = ref(false);
</script>

<style scoped>
.main-layout {
  display: flex;
}
.content {
  margin-left: 240px; /* Lebar sidebar */
  padding: 2.5rem;
  width: calc(100% - 240px);
  min-height: 100vh;
  transition: margin-left 0.3s ease;
}
.hamburger-menu {
  display: none; /* Sembunyi di desktop */
  position: fixed;
  top: 1.5rem;
  
  /* --- PERUBAHAN DI SINI --- */
  /* Mengubah posisi dari kiri ke kanan */
  right: 1.5rem; 
  /* left: 1.5rem; Dihapus */

  z-index: 1001;
  background-color: var(--card);
  border-radius: 50%;
  padding: 0.75rem;
  box-shadow: var(--shadow);
  color: var(--foreground); 
}
.overlay {
  display: none;
}

/* --- Responsive Styles --- */
@media (max-width: 768px) {
  .content {
    margin-left: 0;
    width: 100%;
    padding: 1.5rem;
  }
  .hamburger-menu {
    display: inline-flex;
  }
  .overlay {
    position: fixed;
    top: 0; 
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
    display: block;
  }
}
</style>