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

//删除临时目录下的指定文件
export const delosscontents = (temid)=>{
    return http.delete('/delosscontents',{params:{
        temid
    }})
}


//取消分片上传
export const abortMultipartUpload = (FileName, uploadId)=>{
    return http.post('/cancelupload',{FileName, uploadId})
}

