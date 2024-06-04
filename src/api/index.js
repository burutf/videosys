import { configOss } from '@/utils/oss/configOss'
import http from '@/utils/axios'


//获取sts临时令牌
export const stsOSS = () => {
    return http.get('/sts')
}

//上传文件（分片上传）
export const upload = async (FileName, fileobj, options) => {
    const clientOSS = await configOss()
    //开始上传
    const putdata = await clientOSS.multipartUpload(FileName, fileobj, { ...options })
    clientOSS.cancel();

    return putdata
}
//上传过程中，删除已经上传了但是不需要的文件
export const delupload = async (FileName) => {
    const clientOSS = await configOss()
    const delfile = await clientOSS.delete(FileName)
    return delfile
}

//取消上传
export const abortMultipartUpload = async (name, uploadId)=>{
    const clientOSS = await configOss()
    const result  = await clientOSS.abortMultipartUpload(name, uploadId)
    return result
}