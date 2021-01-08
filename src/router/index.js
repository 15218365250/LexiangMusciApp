import Vue from 'vue'
import VueRouter from 'vue-router'
import Recommend from '../views/Recommend'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',//默认首页
    name: 'Recommend',
    component: Recommend
  },
  {
    path:'/hotList',
    name:"HotMousic",
    component:()=>import('../views/HotMusic')
  }
]

const router = new VueRouter({
  mode:"hash",
  routes
})

export default router
