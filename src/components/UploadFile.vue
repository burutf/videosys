<template>
  <div>
    <el-upload
      class="upload-demo"
      action=""
      ref="upload"
      multiple
      :limit="50"
      :file-list="fileList"
      :http-request="handleUploadFile"
      :before-upload="beforeUpload"
      :before-remove="beforeremove"
      :on-change="onchange"
    >
      <el-button size="small" type="primary">上传文件</el-button>
    </el-upload>
    {{ fileList }}
    {{ filefpid }}
  </div>
</template>

<script>

export default {
  name: "UploadFile",
  data() {
    return {
      dada: {},
      fileList: [],
      userid:10001,
      uploadTemUrl:"temporary/",
      //每个分片上传文件的id
      filefpid:[]
    };
  },
  methods: {
    //自定义上传
    handleUploadFile(filec) {
      //等下DOM再执行获取文件列表
      this.$nextTick(async () => {
        const {name} = filec.file
        const {file} = filec
        const uploadreturn = await this.$API.upload(`${this.temlurl}${name}`,file,this.fhopiton());
        


        // //获取每个文件分片上传时的ID
        // const resid = await this.$API.inituploadid(`${this.temlurl}${name}`)
        // //名字
        // const namefp = resid.name
        // //id
        // const uploadId = resid.uploadId
        // this.filefpid.push({
        //   [namefp]:uploadId
        // })
        // console.log(uploadId);
        // //开始分片进行上传，中途可停止
        // const partupload = await this.$API.partupload(1,uploadId)
        // console.log(partupload);




        //执行这个函数可以给文件列表后面打钩
        filec.onSuccess()
      });
    },
    //上传之前做校验
    beforeUpload(file) {
      //拿到文件的类型和大小
      const {type,size} = file;
      const istype = type === "video/mp4"
      const issize = size/1024/1024 < 1024*4   //乘号后面单位GB，当前是最大不超过4GB
      if (!istype) {
        this.$message.error('目前只支持MP4格式，请重新上传');
      }
      if (!issize) {
        this.$message.error('最大文件不能超过4GB，请重新上传');
      }
      return istype&&issize
    },
    //删除文件时也要更新列表
    async beforeremove(file, fileList) {
      
      const {name} = file
      //删除OSS里的文件
      const delfileres = await this.$API.delupload(`${this.temlurl}${name}`)
      if (delfileres.res.status===204) {
        this.$nextTick(() => {
          this.fileList = fileList
        })
      }
    },
    //文件列表发生更改时，更新fileList数组
    onchange(file, fileList) {
      this.$nextTick(() => {
        this.fileList = fileList
      })
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    //分片上时的配置项
    fhopiton(){
      const options = {
        // 获取分片上传进度、断点和返回值。
        progress: (p, cpt, res) => {
          //最后一个分片不执行
          if (p!==1){
            //下面这一段是，获取名字和分片初始化时的id，再添加到一个数据里面，方便后面中断操作，数组有做去重处理
            const {name,uploadId} = cpt
            const isexist = Boolean(this.filefpid.find((item,i)=>{
              return item.name === name
            }))
            if (!isexist) {
              this.filefpid.push({name:name,uploadId:uploadId})
            }
          }
        },
        // 设置并发上传的分片数量。
        // parallel: 4,
        // 设置分片大小。默认值为1 MB，最小值为100 KB。
        // partSize: 1024 * 1024,
      }
      return options
    }
  },
  computed:{
    //拼接
    temlurl(){
      return `${this.userid}/${this.uploadTemUrl}`
    }
  }
};
</script>

<style lang="less">
.upload-demo {
    display: flex;
    align-items: center;
    height: 150px;
    border: 1px solid black;
    margin: 10px;
    .el-upload{
      flex: 2;
    }
    .el-upload-list{
      overflow: auto;
      height: 100%;
      flex: 8;
    }
}
</style>