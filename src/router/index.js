import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Rules from '../views/Rules.vue'
import Answers from '../views/Answers.vue'
import MiniGame1 from '../views/MiniGame1.vue'

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
    },
    {
      path: '/minigame1',
      name: 'minigame1',
      component: MiniGame1
    }
  ]
})

export default router
