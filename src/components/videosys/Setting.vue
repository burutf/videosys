<template>
  <table class="table">
    <tbody>
      <tr>
        <td>轮播图展示：</td>
        <td>
          <el-switch
            v-model="setting.isslideshow"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="slideshowchange"
          >
          </el-switch>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "Setting",
  //接收设置对象
  props: ["rawdata"],
  data() {
    return {
      setting: {
        isslideshow: false,
      },
      videoid: "",
    };
  },
  mounted() {
    // this.init()
  },
  methods: {
    //轮播图开关
    slideshowchange() {
      try {
        this.$API.videosys.setslideshow(this.setting.isslideshow, this.videoid);
      } catch (error) {}
    },
    //init
    init() {
      //存到自己的里面
      //视频id
      this.videoid = this.rawdata.videoid;
      //分别设置属性
      //轮播图展示
      try {
        this.setting.isslideshow = this.rawdata.setting.isslideshow;
      } catch (error) {
        this.setting.isslideshow = false
      }
    },
  },
  watch: {
    rawdata: {
      handler(newdata) {
        //清数据时就不执行了
        if (!newdata.videoid) return;
        this.init();
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>

<style lang="less" scoped></style>
