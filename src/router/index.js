import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Store from "../store";

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    redirect: 'login'
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/Home.vue'),
    beforeEnter: (to, from, next) => {
      if(!Store.getters['login/token']) {
        router.push('login')
      }
      next()
    },
    children: [
      {
        path: '/user',
        name: '/user',
        component: () => import('../components/user/UserContainer')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
