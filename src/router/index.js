import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '@/layouts/MainLayout.vue'
import Dashboard from '@/pages/Dashboard.vue'
import Login from '@/pages/Login.vue'
import DailyLog from '@/pages/DailyLog.vue'
import Analytics from '@/pages/Analytics.vue'
import Settings from '@/pages/Settings.vue'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { public: true }
  },
{
  path: '/',
  component: MainLayout,
  children: [
    { path: '', name: 'Dashboard', component: Dashboard },
    { path: 'daily-log', name: 'DailyLog', component: DailyLog }, // <-- ini
    { path: 'analytics', name: 'Analytics', component: Analytics },
    { path: 'settings', name: 'Settings', component: Settings },
  ]
}

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// ✅ FIX: Gunakan defer import agar tidak freeze
router.beforeEach(async (to, from, next) => {
  const { useAuthStore } = await import('@/stores/authStore') // ini defer loading
  const auth = useAuthStore()

  if (!to.meta.public && !auth.user) {
    return next('/login')
  }

  if (to.path === '/login' && auth.user) {
    return next('/')
  }

  next()
})

export default router
