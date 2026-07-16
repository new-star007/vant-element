import Vue from 'vue'
import App from './App.vue'
import 'vant/lib/index.css'
import VantElement from 'vant-element'
import router from './router'

Vue.use(VantElement)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
