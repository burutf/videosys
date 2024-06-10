<template>
  <div class="uploadsys">
    <div class="UploadFile">
      <!-- 视频上传模块 -->
      <UploadFile @filelistcd="filelistcd"></UploadFile>
    </div>
    <!-- 表单提交模块 -->
    <Formdata v-if="this.filelist.length > 0" :filelist="filelist"></Formdata>
    <!-- 描述窗口 -->
    <div v-else class="message">
      <div class="messagediv">
        <p>视频格式：mp4</p>
        <p>{{ `大小<4G` }}</p>
        <p>封面格式：jpg</p>
        <p>{{ `大小<3MB` }}</p>
      </div>
    </div>
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
      filelist: [],
    };
  },
  //从这里路由离开时的钩子，有数据就弹窗，没有就不管
  beforeRouteLeave(to, from, next) {
    if (this.filelist.length===0) {
      next()
      return
    }
    this.$confirm("你不继续上传要离开，系统将不会保留你的信息, 是否继续?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    })
      .then(() => {
        next();
      })
      .catch(() => {
        next(false);
      });
  },
  methods: {
    //UploadFile组件的自定义事件接收文件列表
    filelistcd(data) {
      this.filelist = data;
    },
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
  .message {
    display: flex;
    justify-content: center;
    margin-top: 50px;
    .messagediv {
      background-color: rgb(255, 255, 255);
      border-radius: 10px;
      box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.05);
      width: 65%;
      text-align: center;
      padding: 30px;
      font-size: 14px;
      color: rgb(84, 84, 84);
    }
  }
}
</style>