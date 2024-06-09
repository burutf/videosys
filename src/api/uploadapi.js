import { configOss } from '@/utils/oss/configOss'


//上传过程中，删除文件
export const delupload = async (FileName) => {
    const clientOSS = await configOss()
    const delfile = await clientOSS.delete(FileName)
    return delfile
}
/////////////////////////////////////////////////////////////////
//视频上传
//上传文件（分片上传）
export const upload = async (FileName, fileobj, options) => {
    const clientOSS = await configOss()
    //开始上传
    const putdata = await clientOSS.multipartUpload(FileName, fileobj, { ...options })
    return putdata
}

//取消上传
export const abortMultipartUpload = async (FileName, uploadId)=>{
    const clientOSS = await configOss()
    const result  = await clientOSS.abortMultipartUpload(FileName, uploadId)
    return result
}
//////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////
//封面上传
//上传封面(简单上传)
export const uploadcover = async (FileName, fileobj, options) => {
    const clientOSS = await configOss()
    //开始上传
    const uploadcover = await clientOSS.put(FileName, fileobj,  {...options} )
    return uploadcover
}