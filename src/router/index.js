import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PlayView from '../views/PlayView.vue'

const router = createRouter({
  history: createWebHistory('/guessandguess/'),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/play',
      name: 'play',
      component: PlayView,
    },
  ],
})

export default router
