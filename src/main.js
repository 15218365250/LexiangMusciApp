import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false
let playingMusic = {
  musicID :0,
  playingList:[],
  outplay:false
}
new Vue({
  router,
  data:{
    playingMusic
  },
  render: h => h(App)
}).$mount('#app')
