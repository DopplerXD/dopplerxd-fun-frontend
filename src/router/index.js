import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/guess-and-guess/GuessHomeView.vue'
import PlayView from '../views/guess-and-guess/GuessPlayView.vue'
import ZibenHomeView from '@/views/fuck-ziben/ZibenHomeView.vue'
import DeepSleepView from '@/views/deepsleep/DeepSleepView.vue'
import DeepSleepChatView from '@/views/deepsleep/DeepSleepChatView.vue'

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
    },
    {
      path: '/deepsleep',
      name: 'deepsleep',
      component: DeepSleepView,
    },
    {
      path: '/deepsleep/chat',
      name: 'deepsleep-chat',
      component: DeepSleepChatView,
    }
  ],
})

export default router
