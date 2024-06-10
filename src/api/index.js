

//上传时的oss接口
import * as uploadapi from '@/api/uploadapi'
//额外的一些接口
import * as extraapi from '@/api/extra'



//获取临时oss资源url
// export const gettemporaryurl = async (FileName)=>{
//     const clientOSS = await configOss()
//     const gettemporaryurl = await clientOSS.signatureUrl(FileName);
//     return gettemporaryurl
// }


export {
    uploadapi,
    extraapi
}
