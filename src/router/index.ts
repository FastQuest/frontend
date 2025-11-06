import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
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
      component: () => import('../views/ListView.vue'),
      props: true
    },
    {
      path: '/lists/:id/answering',
      name: 'answering',
      component: () => import('../views/AnsweringList.vue'),
      props: true
    },
    {
      path: '/lists/new',
      name: 'create',
      component: () => import('../views/CreateListView.vue'),
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
    }
  ],
})

export default router
