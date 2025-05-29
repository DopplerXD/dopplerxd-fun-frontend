import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/guess-and-guess/GuessHomeView.vue'
import PlayView from '../views/guess-and-guess/GuessPlayView.vue'
import ZibenHomeView from '@/views/fuck-ziben/ZibenHomeView.vue'

const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    {
      path: '/guessandguess/home',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/guessandguess/play',
      name: 'play',
      component: PlayView,
    },
    {
      path: '/ziben',
      name: 'ziben',
      component: ZibenHomeView,
    }
  ],
})

export default router
