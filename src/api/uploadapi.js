import { configOss } from '@/utils/oss/configOss'
//axios
import http from '@/utils/axios'


/////////////
//客户端直传//
/////////////

//视频上传
//上传文件（分片上传）
export const upload = async (FileName, fileobj, options) => {
    const clientOSS = await configOss()
    //开始上传
    const putdata = await clientOSS.multipartUpload(FileName, fileobj, { ...options })
    return putdata
}

//封面上传
//上传封面(简单上传)
export const uploadcover = async (FileName, fileobj, options) => {
    const clientOSS = await configOss()
    //开始上传
    const uploadcover = await clientOSS.put(FileName, fileobj,  {...options} )
    return uploadcover
}

///////////////////////////////////////////////////////////////
//全部数据准备好了后把数据发送到服务器，进行数据校验保存
//如果传入了videoid，则视为修改操作，没有的话就是新增
export const fullupload = async (filelist,formdata,videoid='',delvideolist=[])=>{
    const fullupload = await http.post('/fullupload',{
        'filelist':filelist,
        'formdata':formdata,
        'videoid':videoid,
        'delvideolist':delvideolist
    })
    return fullupload
}