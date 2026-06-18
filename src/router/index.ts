import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth'
      }
    }
    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/create',
      name: 'create',
      component: () => import('../views/CreateView.vue'),
    },
    {
      path: '/questions',
      name: 'search',
      component: () => import('../views/QuestionsView.vue'),
    },
    {
      path: '/lists',
      name: 'searchlists',
      component: () => import('../views/QuestionSetsView.vue'),
    },
    {
      path: '/lists/add-to-list',
      name: 'searchadd',
      component: () => import('../views/QuestionsView.vue'),
    },
    {
      path: '/questions/:id',
      name: 'question',
      component: () => import('../views/QuestionView.vue'),
      props: true
    },
    {
      path: '/lists/:id',
      name: 'list',
      component: () => import('../views/QuestionSetView.vue'),
      props: true
    },
    {
      path: '/lists/:id/answer',
      name: 'answer',
      component: () => import('../views/AnswerSetView.vue'),
      props: true
    },
    {
      path: '/lists/:id/answer/check',
      name: 'checkanswer',
      component: () => import('../views/AnswerSetCheckView.vue'),
      props: true
    },
    {
      path: '/list/addquestion',
      name: 'addQuestion',
      component: () => import('../views/AddQuestionList.vue')
    },
    {
      path: '/test/',
      name: 'test',
      component: () => import('../views/TestView.vue'),
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/UserProfile.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('../views/NotFoundView.vue'),
    },
  ],
})

export default router
