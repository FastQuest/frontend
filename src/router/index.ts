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
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/DashboardView.vue'),
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('../views/SearchView.vue'),
    },
    {
      path: '/search-lists',
      name: 'searchlists',
      component: () => import('../views/SearchListView.vue'),
    },
    {
      path: '/search/add-to-list',
      name: 'searchadd',
      component: () => import('../views/SearchView.vue'),
    },
    {
      path: '/question/:id',
      name: 'question',
      component: () => import('../views/QuestionView.vue'),
      props: true
    },
    {
      path: '/list/:id',
      name: 'list',
      component: () => import('../views/ListView.vue'),
      props: true
    },
    {
      path: '/list/:id/answering',
      name: 'answering',
      component: () => import('../views/AnsweringList.vue'),
      props: true
    },
    {
      path: '/create-list',
      name: 'create',
      component: () => import('../views/CreateListView.vue'),
      props: true
    },
  ],
})

export default router
