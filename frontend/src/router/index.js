import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Incomes from '@/views/Incomes.vue'
import Expenses from '@/views/Expenses.vue'
import Reports from '@/views/Reports.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: Login },
    { path: '/incomes', component: Incomes, meta: { requiresAuth: true } },
    { path: '/expenses', component: Expenses, meta: { requiresAuth: true } },
    { path: '/reports', component: Reports, meta: { requiresAuth: true } }
  ]
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');

  if (to.meta.requiresAuth && !token) {
    next('/'); 
  } else {
    next();
  }
});

export default router
