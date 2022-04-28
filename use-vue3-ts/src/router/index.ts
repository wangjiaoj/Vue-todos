import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
 

const routes: Array<RouteRecordRaw> = [
  {
    path: '/List',
    name: 'List',
    component: () => import( '../views//list/index.vue')
  },
  {
    path: '/Detail',
    name: 'Detail',
    component:()=>import  ('../views/detail/index.vue') 
  },
  {
    path: '/apply',
    name: 'apply',
    component:()=>import  ('../views/apply/index.vue') 
  },
  {
    path: '/lifeCircle',
    name: 'lifeCircle',
    component:()=>import  ('../views/lifeCircle/index.vue') 
  },
  {
    path: '/keepAlive',
    name: 'keepAlive',
    component:()=>import  ('../views/lifeCircle/keepAlive.vue') 
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
  history: createWebHistory(),//process.env.BASE_URL
  routes
})

export default router
