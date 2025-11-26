import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Rules from '../views/Rules.vue'
import Answers from '../views/Answers.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/rules',
      name: 'rules',
      component: Rules
    },
    {
      path: '/answers',
      name: 'answers',
      component: Answers
    }
  ]
})

export default router
