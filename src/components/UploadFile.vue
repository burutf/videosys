<template>
  <div>
    <el-upload
      class="upload-demo"
      action=""
      ref="upload"
      accept="#"
      multiple
      :limit="120"
      :file-list="fileList"
      :http-request="handleUploadFile"
      :before-upload="beforeUpload"
      :before-remove="beforeremove"
      :on-change="onchange"
      list-type="picture"
    >
      <el-button size="small" type="primary">选取文件</el-button>
      <el-button
        style="margin-left: 10px"
        size="small"
        type="success"
        @click="submitUpload"
        >上传到服务器</el-button
      >
    </el-upload>
    {{ fileList }}
  </div>
</template>

<script>
export default {
  name: "UploadFile",
  data() {
    return {
      dada: {},
      fileList: [],
    };
  },
  methods: {
    //自定义上传
    handleUploadFile(filec) {
      //等下DOM再执行获取文件列表
      this.$nextTick(async () => {
        const {name} = filec.file
        const {file} = filec
        const uploadreturn = await this.$API.upload(name,file);
        console.log(uploadreturn);

        //表单数据收集还没做，要考虑文件上传什么时候传
        //今天该完善上传完后的数据整理上传到服务器、用户反馈


      });
    },
    //上传之前做校验
    beforeUpload(file) {
      
    },
    //删除文件时也要更新列表
    beforeremove(file, fileList) {
      this.fileList = fileList;
    },
    //文件列表发生更改时，更新fileList数组
    onchange(file, fileList) {
      this.fileList = fileList;
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
  },
};
</script>

<style></style>