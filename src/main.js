import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'
import './style.css'

// Apply dark/light theme saat startup
const savedTheme = localStorage.getItem('theme') || 'light'
document.documentElement.setAttribute('data-theme', savedTheme)

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')
