import http from '@/config/axios'

//
//echarts相关api
//

//拿到今日视频状态
export const getvideostatus = ()=>{
    return http.get('/getvideostatus')
}

//拿到用户权限的分布数量
export const getuserauthsum=()=>{
    return http.get('/getuserauthsum')
}