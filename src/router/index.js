import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import store from '@/store'
Vue.use(VueRouter)

const vuepush = VueRouter.prototype.push
//重写push方法，阻止报错
VueRouter.prototype.push = function push(location) {
  return vuepush.call(this, location).catch(err => err)
}

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  //这块是判断用户有没有获取token，没有则不能进入登录以外的路由
  //如果有token，则判断为登陆了，登陆了还想二次登陆？
  const token = store.state.token
  if (token || to.path === '/login') {
    if (token && to.path === '/login') {
      next(false)
      return
    }
    next()
  } else {
    next('/login')
  }
})

export default router
