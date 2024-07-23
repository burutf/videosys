<template>
  <div>
    <Swiper
      @updatefn="updatefn"
      @delfn="delfn"
      ref="swiper"
      :list="list" 
    ></Swiper>
  </div>
</template>

<script>
import Videolist from "@/components/videosys/Videolist.vue";

//引入轮播图
import Swiper from "@/components/slideshow/Swiper.vue";

export default {
  name: "Slideshow",
  data() {
    return {
      list: [],
    };
  },
  created() {
    this.getlist();
  },
  methods: {
    //获取轮播图列表
    async getlist() {
      try {
        const { data } = await this.$API.videosys.getslideshowlist();
        this.list = data;

      } catch (error) {
        console.log(error);
      }
    },
    //更改
    async updatefn(imgobj, videoid,coverurl) {
      if (coverurl) {
        coverurl = new URL(coverurl).pathname
      }

      try {
        await this.$API.videosys.updateslideshowimg(imgobj, videoid,coverurl);
        await this.getlist();

        
      } catch (error) {
        console.log(error);
      }
    },
    //删除
    async delfn(videoid) {
      try {
        await this.$API.videosys.delslideshowlist(videoid);
        await this.getlist();
        
      } catch (error) {
        console.log(error);
      }
    },
  },
  components: {
    Videolist,
    Swiper,
  },
};
</script>

<style lang="less" scoped>
.heightdiv {
  height: 100vh;
}
</style>
