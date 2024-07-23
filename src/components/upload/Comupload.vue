<template>
  <div>
    <div class="uploadsys" v-loading="loading">
      <div class="UploadFile">
        <!-- 视频上传模块 -->
        <UploadFile ref="upfile" @filelistcd="filelistcd"></UploadFile>
      </div>

      <div v-if="existnomessage.length>0">
        检验失败的文件（请重新上传）：
        <el-tag style="margin-left: 5px;" type="danger" v-for="e of existnomessage" :key="e.name">{{e.name.split('/')[3]}}</el-tag>
      </div>

      <!-- 表单提交模块 -->
      <Formdata
        @updataloading="updataloading"
        @endeve="endeve"
        @noexist="noexist"
        v-if="filelist.length > 0"
        :filelist="filelist"
      ></Formdata>
      <!-- 描述窗口 -->
      <div v-else class="message">
        <div class="messagediv">
          <p>视频格式：mp4</p>
          <p>{{ `大小<1GB` }}</p>
          <p>封面格式：jpg、png</p>
          <p>{{ `大小<3MB` }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UploadFile from "@/components/upload/UploadFile.vue";
import Formdata from "@/components/upload/Formdata.vue";

//引入上传状态组件
import UploadStatus from "@/views/chidren/uploadsys/UploadStatus.vue";

export default {
  name: "Comupload",
  props: ["tabname"],
  data() {
    return { filelist: [], loading: false, issuccess: false ,existnomessage:[]};
  },
  methods: {
    //UploadFile组件的自定义事件接收文件列表
    filelistcd(data) {
      this.filelist = data;
    },
    //接收Formdata子组件的上传状态，设置加载的值
    updataloading(status) {
      this.loading = status;
    },
    //上传成功的回调
    endeve() {
      //通知父组件，删除掉这个tab
      this.$emit("successdel", this.tabname);
    },
    //上传失败校验出错时的处理
    noexist(ress) {
      console.log(ress);
      const {isexist:{data}} = ress
      const listarr = data.filter(e=>{
        return e.exist === false
      })
      this.existnomessage = listarr
      console.log(this.existnomessage);
      this.$message({
        type: "error",
        message: "有文件未成功上传，请重新上传",
      });
    },
  },
  components: {
    UploadFile,
    Formdata,
    UploadStatus,
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
