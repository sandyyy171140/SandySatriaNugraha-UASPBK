<template>
  <label class="toggle-switch">
    <input type="checkbox" v-model="isDark" @change="applyTheme" />
    <span class="slider">
        <Sun class="icon sun" />
        <Moon class="icon moon" />
    </span>
  </label>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Sun, Moon } from 'lucide-vue-next'

const isDark = ref(false);

onMounted(() => {
  const saved = localStorage.getItem('theme') || 'light';
  isDark.value = saved === 'dark';
  applyTheme();
});

const applyTheme = () => {
  const theme = isDark.value ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
};
</script>

<style scoped>
.toggle-switch {
  position: relative;
  display: inline-block;
  width: 70px;
  height: 36px;
}
.toggle-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--muted);
  transition: .4s;
  border-radius: 34px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 6px;
}
.slider:before {
  position: absolute;
  content: "";
  height: 28px;
  width: 28px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: .4s;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}
input:checked + .slider {
  background-color: var(--primary);
}
input:checked + .slider:before {
  transform: translateX(34px);
}
.icon {
    width: 20px;
    height: 20px;
    color: #facc15; /* Yellow for sun/moon */
}
.moon { color: #a78bfa; }
</style>