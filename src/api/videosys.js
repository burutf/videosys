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

//设置轮播图展示
export const setslideshow= (isslideshow,videoid)=>{
    return http.post('/setslideshow',{
        isslideshow,videoid
    })
}

//获取轮播图列表
export const getslideshowlist = ()=>{
    return http.get('/getslideshowlist')
}

//删除一条轮播图
export const delslideshowlist = (videoid,isthoroughdel)=>{
    return http.delete('/delslideshowlist',{params:{videoid,isthoroughdel}})
}

//更换和上传轮播图中一条的图片
export const updateslideshowimg = (imgobj,videoid,urlname) =>{
    return http.post('/updateslideshowimg',{imgobj,videoid,urlname})
}

//获取轮播图历史列表
export const gethistorylist = ()=>{
    return http.get('/gethistorylist')
}

//进行轮播图排序
export const setserialslideshow = (videoidlist)=>{
    return http.post('/setserialslideshow',{videoidlist})
}