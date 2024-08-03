<template>
  <div>
    <!-- 轮播图展示 -->
    <Swiper
      @updatefn="updatefn"
      @delfn="delfn"
      ref="swiper"
      :list="list"
    ></Swiper>
    <div style="padding: 20px">
      <!-- 排序 -->
      <Sortslideshow @sortslideshowfn="sortslideshowfn" @switchindex="switchindex" :list="list" v-if="list"></Sortslideshow>
       <!-- 历史记录 -->
      <History @delslideshowlist="delslideshowlist" @restore="restore" :tableData="historylist" :loading="loading"></History>
    </div>
  </div>
</template>

<script>
//引入轮播图
import Swiper from "@/components/slideshow/Swiper.vue";
//引入历史记录组件
import History from "@/components/slideshow/History.vue";
//引入排序组件
import Sortslideshow from "@/components/slideshow/Sortslideshow.vue";
//引入时间格式化插件
import moment from "moment";

export default {
  name: "Slideshow",
  data() {
    return {
      list: [],
      historylist: [],
      loading: false,
    };
  },
  created() {
    this.getlist();
    this.githistorylist();
  },
  methods: {
    //获取轮播图列表
    async getlist() {
      try {
        const { data } = await this.$API.videosys.getslideshowlist();
        this.list = data;
      } catch (error) {}
    },
    //获取历史记录列表
    async githistorylist() {
      try {
        this.loading = true;
        const { data } = await this.$API.videosys.gethistorylist();
        //格式或日期
        data.forEach((e) => {
          e.date = moment(e.date).format("YYYY/MM/DD HH:mm");
        });
        this.historylist = data;
        this.loading = false;
      } catch (error) {
        this.loading = false;
      }
    },
    //更改
    async updatefn(imgobj, videoid, urlname) {
      try {
        await this.$API.videosys.updateslideshowimg(imgobj, videoid, urlname);
        await this.getlist();
      } catch (error) {}
    },
    //删除(有设置图片就放到历史记录中，没有就彻底删除)
    async delfn(videoid) {
      try {
        await this.$API.videosys.delslideshowlist(videoid);
        await this.getlist();
        await this.githistorylist();
      } catch (error) {}
    },
    //彻底删除
    async delslideshowlist(videoid){
      try {
        await this.$API.videosys.delslideshowlist(videoid, true);
        await this.githistorylist();
      } catch (error) {}
    },
    //还原（从历史记录中移出）
    async restore(videoid){
      try {
        await this.$API.videosys.setslideshow(true,videoid)
        await this.githistorylist();
        await this.getlist();
      } catch (error) {}
    },
    //排序
    async sortslideshowfn(videoidlist){
      try {
        this.$API.videosys.setserialslideshow(videoidlist)
        await this.getlist();
      } catch (error) {}
    },
    //点击切换到对应的轮播图
    switchindex(index){
      this.$refs.swiper.swiper.slideTo(index)
    }
  },
  components: {
    Swiper,
    History,
    Sortslideshow
  },
};
</script>

<style lang="less" scoped>
.heightdiv {
  height: 100vh;
}
</style>
