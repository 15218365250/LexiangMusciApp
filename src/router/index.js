import Vue from 'vue'
import VueRouter from 'vue-router'
import Recommend from '../views/Recommend'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',//默认首页
    name: 'Recommend',
    component: Recommend,
    children: [
      {
        path: '/playlist',//默认首页
        name: 'Playlist',
      }
    ]
  },
  {
    path: '/hotList',//热歌榜
    name: "HotMousic",
    component: () => import('../views/HotMusic')
  },
  {
    path: '/search',//搜索
    name: 'Search',
    props: true,
    component: () => import('../views/Search')
  },
  {
    path: '/searchList',//搜索列表
    name: 'SearchList',
    component: () => import('../components/SearchList')
  }, {
    path: '/playlist/:playlistID',//歌单列表
    name: 'Playlist',
    props: true,
    component: () => import('../components/Playlist')
  },
  {
    path: '/playMusic',
    name: "PlayMusic",
    component: () => import('../views/PlayMusic')
  }
]

const router = new VueRouter({
  mode: "hash",
  routes
})

export default router
