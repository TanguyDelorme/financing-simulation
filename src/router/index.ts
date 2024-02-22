import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '',
      redirect: '/investment',
    },
    {
      path: '/investment',
      name: 'investment',
      component: () => import('../views/InvestmentSimulator.vue')
    },
    {
      path: '/404',
      component: () => import('../views/Error404.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/404'
    }
  ]
})

export default router
