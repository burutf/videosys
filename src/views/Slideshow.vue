<template>
  <div>
    <el-button @click="addcover">添加</el-button>
    <Swiper ref="swiper" :list="list"></Swiper>
    
    <Videolist>
        <template v-slot="{scope}">
            <el-link type="success" class="el-icon-circle-plus" style="font-size: 2em;" :underline="false"></el-link>
            <el-link type="danger" class="el-icon-remove" style="font-size: 2em;" :underline="false"></el-link>
        </template>
    </Videolist>
  </div>
</template>

<script>
import Videolist from "@/components/videosys/Videolist.vue";

//引入轮播图
import Swiper from "@/components/slideshow/Swiper.vue";


export default {
  name: "Slideshow",
  data(){
    return{
        list: [
        {
          coverurl: "https://swiperjs.com/demos/images/nature-1.jpg",
          videoid: "1",
          index:0
        },
        {
          coverurl: "https://swiperjs.com/demos/images/nature-2.jpg",
          videoid: "2",
          index:1
        },
        {
          coverurl: "https://swiperjs.com/demos/images/nature-3.jpg",
          videoid: "3",
          index:2
        },
        {
          coverurl: "https://swiperjs.com/demos/images/nature-4.jpg",
          videoid: "4",
          index:3
        },
      ],
    }
  },
  methods: {
    //新增轮播图绑定
    addcover(){
        


        //触发子组件的重新初始化
        this.$refs.swiper.reinit()
    }
  },
  components: {
    Videolist,
    Swiper
  },
};
</script>

<style lang="less" scoped>

</style>
