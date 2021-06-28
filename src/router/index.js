import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import Welcome from '../views/home/Welcome.vue'
import User from '../views/baseData/User.vue'
import Product from '../views/baseData/Product.vue'
// import Record from "../views/stockin/Record.vue"
import StockIn from "../views/stockin/StockIn.vue"
import StockOut from "../views/stockout/StockOut.vue"
import StockInDetail from "../views/stockin/StockinDetail.vue"
import Stockcheck from "../views/stockcheck/Stockcheck.vue"

Vue.use(VueRouter)

const routes = [{
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    redirect: '/home/welcome',
    children: [{
        path: '/welcome',
        component: Welcome
      },
      {
        path: '/user/getAll',
        component: User
      },
      {
        path: '/product/getAll',
        component: Product
      }, {
        path: '/stockin/list',
        component: StockIn
      }, {
        path: '/stockout/list',
        component: StockOut
      }, {
        path: "/stockin/detail/:id",
        name: 'StockInDetail',
        component: StockInDetail
      }, {
        path: '/stockcheck/list',
        component: Stockcheck
      },
    ]
  }
]

const router = new VueRouter({
  routes
})

// 挂在路由导航守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  // 获取token
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})

export default router