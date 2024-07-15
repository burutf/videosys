//axios
import http from '@/config/axios'

//oss的操作api

//上传后，删除文件
export const delupload = (FileName,ismulti) => {
    return http.delete('/delossfile',{params:{
        FileName,
        ismulti
    }})
}


//取消分片上传
export const abortMultipartUpload = (FileName, uploadId)=>{
    return http.post('/cancelupload',{FileName, uploadId})
}

