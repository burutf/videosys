import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

//引入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

//引入echats
import echarts from '@/config/echarts/index'

//引入所有的api接口
import api from '@/api';

Vue.use(ElementUI);

Vue.config.productionTip = false;

//这里提前获取用户信息,让全局路由守卫可以获取异步vuex中state中的数据
(async () => {
  if (store.state.token) {
    try {
      await store.dispatch('getinfo')
    } catch (error) {
      router.push('/404')
    }
  }

  new Vue({
    router,
    store,
    render: h => h(App),
    beforeCreate() {
      Vue.prototype.$API = api
      Vue.prototype.$echarts = echarts
    }
  }).$mount('#app');
})()



