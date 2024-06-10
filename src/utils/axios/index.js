import axios from "axios";


const http = axios.create({
    //请求的超时
    timeout: 10000,
    //前缀
    baseURL: '/api'
});
//请求拦截器
http.interceptors.request.use((config) => {
    // 在请求发送之前做些什么


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
    return Promise.reject(error.response.data);
});


export default http