import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import iview from 'view-design'
import 'view-design/dist/styles/iview.css'
import { baseURL } from '@/config'
import axios from 'axios'
Vue.prototype.$baseURL = baseURL
Vue.config.productionTip = false
Object.defineProperty(Vue.prototype, '$http', { value: axios }) // 把axios 加入到Vue对象里面
Vue.config.productionTip = false
Vue.use(iview)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')