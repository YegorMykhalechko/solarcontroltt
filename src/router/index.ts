import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem('user')) {
          next('/dashboard')
        } else {
          next()
        }
      }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue'),
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem('user')) {
          next('/dashboard')
        } else {
          next()
        }
      }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/DashboardView.vue'),
      beforeEnter: (to, from, next) => {
        if (!localStorage.getItem('user')) {
          next('/')
        } else {
          next()
        }
      }
    },
    {
      path: '/dashboard/:id',
      name: 'cat',
      component: () => import('../views/CatView.vue'),
      beforeEnter: (to, from, next) => {
        if (!localStorage.getItem('user')) {
          next('/')
        } else {
          next()
        }
      }
    }
  ]
})

export default router
