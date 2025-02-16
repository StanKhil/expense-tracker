import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Incomes from '@/views/Incomes.vue'
import Expenses from '@/views/Expenses.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {path: '/', component: Login},
    {path: '/incomes', component: Incomes},
    {path: '/expenses', component: Expenses}
  ]
})

export default router
