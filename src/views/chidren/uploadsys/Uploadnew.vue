<template>
  <div class="uploadsys" v-loading="loading">
    <div class="UploadFile">
      <!-- 视频上传模块 -->
      <UploadFile @filelistcd="filelistcd"></UploadFile>
    </div>
    <!-- 表单提交模块 -->
    <Formdata @updataloading="updataloading" v-if="(this.filelist.length > 0)" :filelist="filelist"></Formdata>
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
import UploadCover from "@/components/UploadCover.vue";

export default {
  name: "Uploadnew",
  data() {
    return {
      filelist: [],
      loading: false,
    };
  },
  //从这里路由离开时的钩子，有数据就弹窗，没有就不管
  beforeRouteLeave(to, from, next) {
    //当前正在上传就不离开
    if (this.loading) {
      this.$notify({
        title: "视频正在上传",
        message: "请不要离开",
        position: "top-left",
        type: 'warning'
      });
      next(false);
      return;
    }
    //如果要跳转到视频上传结果页面就直接跳转
    if (to.path==='/video-upload/status') {
      next();
      return
    }
    //如果没有数据就直接离开
    if (this.filelist.length === 0) {
      next();
      return;
    }
    //根据用户选择离不离开
    this.$confirm(
      "继续上传要离开吗，系统将不会保留你的信息, 是否继续?",
      "提示",
      {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }
    )
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
    //接收Formdata子组件的上传状态，设置加载的值
    updataloading(status){
      this.loading = status
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