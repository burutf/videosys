import {configOss} from '@/utils/oss/configOss'
import http from '@/utils/axios'


//获取sts临时令牌
export const stsOSS = ()=>{
    return http.get('/sts')
}

//上传文件
export const upload = async (FileName,FileUrl)=>{
    //处理字符串，只保留url
    // const url = FileUrl.slice(FileUrl.indexOf(':')+1)
    const clientOSS = await configOss()
    // //开始上传
    const putdata = await clientOSS.put(FileName,FileUrl)
    return putdata
}