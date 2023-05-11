import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/explore',
      name: 'DataExplore',
      component: () => import('../views/DataExplore.vue')
    },
    {
      path: '/',
      name: 'DataSelect',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/DataSelect.vue')
    }
  ]
})

export default router
