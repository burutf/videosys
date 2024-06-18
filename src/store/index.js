import Vue from 'vue'
import Vuex from 'vuex'

import router from '@/router'

import { login } from '@/api/extra'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //打开应用时先从本地存储中获取tooken，获取不到则为空字符串
    token: localStorage.getItem('TaObKcEdN') || ''
  },
  getters: {
  },
  mutations: {
    Gettoken(state,data){
      //仓库存token
      state.token = data.token
      //做本地存储，防止刷新丢失
      localStorage.setItem('TaObKcEdN',state.token)
    },
    //清除token
    Clearlogin(state){
      //清楚token
      state.token = ''
      //清除本地存储
      localStorage.removeItem("TaObKcEdN");
      //跳转到登录页
      try {
        router.push({path:'/login'})
        
      } catch (error) {
        console.log(error);
      }
    }
  },
  actions: {
    async gettoken({ commit }, data) {
      try {
        const res = await login(data)
        if (res.code === 200) {
          commit('Gettoken', res)
          return 'ok'
        }
      } catch (error) {
        return Promise.reject(error)
      }
    }
  },
  modules: {
  }
})
