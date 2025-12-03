import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: () => import('../views/HomeView.vue') },
    { path: '/CreatePlanView', component: () => import('../views/CreatePlanView.vue') },
    { path: '/HistoryView', component: () => import('../views/HistoryView.vue') },
    { path: '/SettingsView', component: () => import('../views/SettingsView.vue') },
    { path: '/ProfileView', component: () => import('../views/ProfileView.vue') },
    { path: '/ExcerciseCatalogueView', component: () => import('../views/ExcerciseCatalogueView.vue') },
  ],
})

export default router
