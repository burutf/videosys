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
export const setslideshow= (settingobj,videoid)=>{
    return http.post('/setslideshow',{
        settingobj,videoid
    })
}

//获取轮播图列表
export const getslideshowlist = ()=>{
    return http.get('/getslideshowlist')
}

//删除一条轮播图
export const delslideshowlist = (videoid)=>{
    return http.delete('/delslideshowlist',{params:{videoid}})
}

//更换和上传轮播图中一条的图片
export const updateslideshowimg = (imgobj,videoid,coverurl) =>{
    return http.post('/updateslideshowimg',{imgobj,videoid,coverurl})
}