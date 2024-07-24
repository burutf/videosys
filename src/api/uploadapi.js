import { configOss } from '@/config/oss/configOss'
//axios
import http from '@/config/axios'


/////////////
//客户端直传//
/////////////

//视频上传
//上传文件（分片上传）
export const upload = async (FileName, fileobj, options) => {
    try {

        const clientOSS = await configOss()
        //开始上传
        const putdata = await clientOSS.multipartUpload(FileName, fileobj, { ...options })
        return putdata
    } catch (error) {
        console.error(error);
    }
}

//封面上传
//上传封面(简单上传)
export const uploadcover = async (FileName, fileobj, options) => {
    try {
        const clientOSS = await configOss()
        //开始上传
        const uploadcover = await clientOSS.put(FileName, fileobj, { ...options })
        return uploadcover
    } catch (error) {
        console.error(error);
    }
}

///////////////////////////////////////////////////////////////
//全部数据准备好了后把数据发送到服务器，进行数据校验保存
//如果传入了videoid，则视为修改操作，没有的话就是新增
export const fullupload = (filelist, formdata,temid, videoid = '', delvideolist = []) => {
    return http.post('/fullupload', {
        'filelist': filelist,
        'formdata': formdata,
        'temid':temid,
        'videoid': videoid,
        'delvideolist': delvideolist
    })
}