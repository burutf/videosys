<template>
  <div class="uploadsys">
    <div class="UploadFile">
      <!-- 视频上传模块 -->
      <UploadFile></UploadFile>
    </div>
    <!-- 表单提交模块 -->
    <Formdata></Formdata>
  </div>
</template>

<script>
import UploadFile from "@/components/UploadFile.vue";
import Formdata from "@/components/Formdata.vue";
import UploadCover from "../components/UploadCover.vue";

export default {
  name: "Uploadsys",
  data() {
    return {};
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