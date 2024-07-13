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
export const gettimenow = ()=>{
    return http.get('/gettime')
}
