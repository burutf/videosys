<template>
  <el-upload
    v-loading="loading"
    action=""
    :show-file-list="false"
    :before-upload="beforeAvatarUpload"
    :http-request="httpupload"
    class="ovfi"
  >
    <slot>
      <img v-if="imageUrl" :src="imageUrlclass" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </slot>
  </el-upload>
</template>

<script>
//引入仓库中的userinfo
import { mapState } from "vuex";

export default {
  name: "UploadCover",
  props: {
    propimgurl: {
      type: String,
      default: "",
    },
    ranid:{
      type: String,
      default: "",
    }
  },
  data() {
    return {
      imageUrl: "",
      uploadTemUrl: "temporary",
      //当前已经上传的文件
      filecovername: "",
      //是否处于加载状态
      loading: false,
    };
  },
  mounted() {

    if (this.propimgurl === "") return;
    //将传来的图片地址给img标签
    this.imageUrl = process.env.VUE_APP_CN + "/" + this.propimgurl;

    
  },
  methods: {
    //上传前校验
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 3;
      if (!isJPG) {
        this.$message.error("上传图片只能是 JPG 或者 PNG 格式!");
      } else if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 5MB!");
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

        let path = `${this.temlurl}${name}`

        const uploadreturn = await this.$API.uploadapi.uploadcover(
          path,
          file,
          this.headers()
        );

        //上传成功后的操作
        if (uploadreturn.res.status === 200) {
          //替换src
          this.imageUrl = uploadreturn.url;
          //保存文件名字，方便后边需要更换封面
          this.filecovername = uploadreturn.name;
          //触发父组件的自定义事件，进行传值
          this.$emit("covername", {
            urlname: uploadreturn.name,
            size: filec.file.size,
            type: filec.file.type,
          });
        }
      } catch (error) {
        console.error(error);
        //触发父组件的自定义事件，进行传值
        this.$emit("covername", "#");
      }
      this.loading = false;
    },
    //删除文件
    async delcover(filename) {
      if (!filename) return;
      await this.$API.osssys.delupload(filename);
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
    ...mapState(["userinfo"]),
    //拼接
    temlurl() {
      return `${this.uploadTemUrl}/${this.userinfo.uuid}/${this.ranid}/`;
    },
    //拼接url文件处理
    imageUrlclass(){
      return this.imageUrl+process.env.VUE_APP_OSSIMGCLASS
    }
  },
};
</script>

<style lang="less" scoped>

</style>
