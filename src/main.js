import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 加载axios
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入reset清除默认样式的文件
import './assets/css/reset.css'
Vue.use(ElementUI)

// 设置请求的基地址
axios.defaults.baseURL = "http://121.89.192.46:7777"
// 请求的拦截器
axios.interceptors.request.use(config => {
  // 拦截请求要去做什么
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
// 设置axios全局
Vue.prototype.$http = axios
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')