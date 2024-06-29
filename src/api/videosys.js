//axios
import http from '@/utils/axios'


//获取视频列表
export const getvideolist = async (options)=>{
    const list = await http.get('/getvideolist',{params:{options}})
    return list
}

//删除列表中的一条
export const dellist = async (videoid)=>{
    const ress = await http.delete('/dellist',{params:{videoid}})
    return ress
}

//更改列表中的一条
export const updatalist = async (videoid,setdata)=>{
    const ress = await http.post('/updatalist',{
        videoid,
        setdata
    })
}