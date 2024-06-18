import http from '@/utils/axios'

//获取番剧类型列表
export const getclassifylist = () => {
    return http.get('/getclassifylist')
}

//获取sts临时令牌
export const stsOSS = () => {
    return http.get('/sts')
}

//获取服务器时间
export const gettime = ()=>{
    return http.get('/gettime')
}

//登陆接口
export const login = (data)=>{
    return http.post('/login',data)
}