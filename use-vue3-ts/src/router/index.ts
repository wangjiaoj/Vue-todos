import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import List from '../views/list/index.vue'
import Detail from '../views/detail/index.vue';
const routes: Array<RouteRecordRaw> = [
  {
    path: '/List',
    name: 'List',
    component: List
  },
  {
    path: '/Detail',
    name: 'Detail',
    component:Detail
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
