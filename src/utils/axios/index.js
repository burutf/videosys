import axios from "axios";

//引入store
import store from "@/store";


const http = axios.create({
    //请求的超时
    timeout: 20000,
    //前缀
    baseURL: '/api'
});
//请求拦截器
http.interceptors.request.use((config) => {
    // 在请求发送之前做些什么
    //拿到仓库中的token,并添加请求头
    const token = store.state.token
    config.headers.Authorization = `Bearer ${token}`;

    return config;
}, (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
});
//响应拦截器
http.interceptors.response.use((response) => {
    // 在响应数据之前做些什么
    return response.data;
}, (error) => {
    // 对响应错误做些什么
    console.log('axios响应了错误');
    //如果是令牌无效了就清除之前的，跳转到登录页
    const { code, message } = error.response.data
    if (code === 401 && message === "无效的令牌") {
        store.commit('Clearlogin')
    }

    return Promise.reject(error.response.data);
});


export default http