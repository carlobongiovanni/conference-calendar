import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PaginatedHomeView from '../views/PaginatedHomeView.vue'
import EventDetail from '../views/EventDetail.vue'
import NotFound from '../views/NotFound.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/paginatedEvents/:skip',
      props: true,
      name: 'paginatedHomeView',
      component: PaginatedHomeView
    },
    {
      path: '/topics',
      name: 'topics',
      component: () => import('../views/TopicsView.vue')
    },
    {
      path: '/alert',
      name: 'alert',
      component: () => import('../views/AlertView.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: "/event/:id",
      name: 'eventDetail',
      component: EventDetail,
      props: true
    },
    {
      path: "/:catchAll(.*)",
      component: NotFound,
    },
  ]
})

export default router
