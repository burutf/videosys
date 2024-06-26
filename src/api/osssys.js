//axios
import http from '@/utils/axios'

//oss的操作api

//上传后，删除文件
export const delupload = async (FileName,ismulti) => {
    const delfile = await http.delete('/delossfile',{params:{
        FileName,
        ismulti
    }})
    return delfile
}


//取消分片上传
export const abortMultipartUpload = async (FileName, uploadId)=>{
    const result  = await http.post('/cancelupload',{FileName, uploadId})
    return result
}

