<template>
  <div class="uploadsys">
    <div class="UploadFile">
      <!-- 视频上传模块 -->
      <UploadFile @filelistcd="filelistcd"></UploadFile>
    </div>
    <!-- 表单提交模块 -->
    <Formdata :filelist="filelist"></Formdata>
  </div>
</template>

<script>
import UploadFile from "@/components/UploadFile.vue";
import Formdata from "@/components/Formdata.vue";
import UploadCover from "../components/UploadCover.vue";

export default {
  name: "Uploadsys",
  data() {
    return {
      filelist:[]
    };
  },
  methods:{
    //UploadFile组件的自定义事件接收文件列表
    filelistcd(data){
      this.filelist = data
    }
  },
  components: {
    UploadFile,
    Formdata,
    UploadCover,
  },
};
</script>

<style lang="less" scoped>
.uploadsys {
  .UploadFile {
    margin-bottom: 20px;
  }
}
</style>