import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {path: '/', component: () => import('../views/HomeView.vue'), alias: '/HomeView'},
    {path: '/CreatePlanView', component: () => import('../views/CreatePlanView.vue')},
    {path: '/HistoryView', component: () => import('../views/HistoryView.vue')},
    {path: '/SettingsView', component: () => import('../views/SettingsView.vue')},
    {path: '/ProfileView', component: () => import('../views/ProfileView.vue')},
    {path: '/StartWorkoutView', component: () => import('../views/StartWorkoutView.vue')},
    {path: '/StartFreeWorkoutView', component: () => import('../views/StartFreeWorkoutView.vue'),},
    {path: '/ShowPlanView', component: () => import('../views/ShowPlanView.vue'),},
    {
      path: '/ExerciseCatalogueView',
      name: 'ExerciseCatalogue',
      component: () => import('../views/ExerciseCatalogueView.vue'),
    },
  ],
})

export default router
