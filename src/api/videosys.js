//axios
import http from '@/config/axios'


//获取视频列表
export const getvideolist = (options)=>{
    return http.get('/getvideolist',{params:{options}})
}

//删除列表中的一条
export const dellist = (videoid)=>{
    return http.delete('/dellist',{params:{videoid}})
}
//批量删除列表
export const dellistbatch = (videoidlist)=>{
    return http.delete('/dellistbatch',{params:{videoidlist}})
}

//更改列表中的一条
export const updatalist = (videoid,setdata)=>{
    return http.post('/updatalist',{
        videoid,
        setdata
    })
}