import Vue from 'vue'
import Vuex from 'vuex'

import router from '@/router'

import { login,getuserinfo } from '@/api/extra'

//引入element-ui
import { Message } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //打开应用时先从本地存储中获取tooken，获取不到则为空字符串
    token: localStorage.getItem('TaObKcEdN') || '',
    userinfo:{}
  },
  getters: {
  },
  mutations: {
    Gettoken(state, data) {
      //仓库存token
      state.token = data.token
      //做本地存储，防止刷新丢失
      localStorage.setItem('TaObKcEdN', state.token)
    },
    Getuserinfodd(state,data){
      //存在这里就行，不需要本地存储
      state.userinfo = data
      console.log(state.userinfo);
    },
    //清除token
    Clearlogin(state) {
      //如果token有值的话就执行清除
      if (state.token) {
        //清楚token
        state.token = ''
        //清除本地存储
        localStorage.removeItem("TaObKcEdN");
        //提示
        Message({
          message: "请重新登陆",
          type: "error",
        })
        //跳转到登录页
        router.push({ path: '/login' })
      }
    }
  },
  actions: {
    //获取token
    async gettoken({ commit }, data) {
      try {
        const res = await login(data)
        commit('Gettoken', res)
        return 'ok'
      } catch (error) {
        return Promise.reject(error)
      }
    },
    //获取用户信息
    async getinfo({commit}){
      try {
        const res = await getuserinfo()
        commit('Getuserinfodd',res.data)
        return 'ok'
      } catch (error) {
        return Promise.reject(error)
      }
    }
  },
  modules: {
  }
})
