<template>
  <div>
    <el-upload
      v-loading="loading"
      class="avatar-uploader"
      action="#"
      limit:1
      :show-file-list="false"
      :before-upload="beforeAvatarUpload"
      :http-request="httpupload"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script>
export default {
  name: "UploadCover",
  data() {
    return {
      imageUrl: "",
      userid: 10001,
      uploadTemUrl: "temporary",
      //当前已经上传的文件
      filecovername: "",
      //是否处于加载状态
      loading: false,
    };
  },
  methods: {
    //上传前校验
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 3;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      } else if (!isLt2M) {
        this.$message.error("上传封面图片大小不能超过 5MB!");
      }
      return isJPG && isLt2M;
    },
    //最后的上传
    async httpupload(filec) {
      //删除掉之前的文件,不走同步，继续执行下面
      this.delcover(this.filecovername);

      const { name } = filec.file;
      const { file } = filec;
      try {
        this.loading = true;
        const uploadreturn = await this.$API.uploadapi.uploadcover(
          `${this.temlurl}${name}`,
          file,
          this.headers()
        );

        //上传成功后的操作
        if (uploadreturn.res.status === 200) {
          //执行这个函数可以给文件列表后面打钩
          filec.onSuccess();
          //替换src
          this.imageUrl = uploadreturn.url;
          //保存文件名字，方便后边需要更换封面
          this.filecovername = uploadreturn.name;
          //触发父组件的自定义事件，进行传值
          this.$emit("covername", uploadreturn.name);
        }
      } catch (error) {
        //触发父组件的自定义事件，进行传值
        this.$emit("covername", '#');
      }
      this.loading = false;
    },
    //删除文件
    async delcover(filename) {
      if (!filename) return;
      const delseq = await this.$API.uploadapi.delupload(filename);
      console.log(filename);
    },

    headers() {
      return {
        //封面上传时设为公共读权限
        headers: {
          "x-oss-object-acl": "public-read",
        },
      };
    },
  },
  computed: {
    //拼接
    temlurl() {
      return `${this.uploadTemUrl}/${this.userid}/`;
    },
  },
};
</script>

<style lang="less" scoped>
.avatar-uploader {
  border: 1px dashed #d6c5c5;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 160px;
  height: 214px;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 160px;
  height: 214px;
  line-height: 214px;
  text-align: center;
}

.avatar {
  display: block;
  width: 160px;
  height: 214px;
}
</style>