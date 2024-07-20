<template>
  <div class="swiper" @click="click">
    <div class="swiper-wrapper">
      <div
        v-for="e of list"
        :key="e.videoid"
        class="swiper-slide"
        :style="{ backgroundImage: 'url(' + e.coverurl + ')' }"
      >
        <div class="topupdate" :data-index="e.index">
          <i
            class="el-icon-refresh updatebutton"
            :data-videoid="e.videoid"
            data-type="update"
          ></i>
          <i class="el-icon-circle-close delcover" :data-videoid="e.videoid" data-type="del"></i>
        </div>
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
// import Swiper bundle with all modules installed
import Swiper from "swiper/bundle";

// import styles bundle
import "swiper/css/bundle";

export default {
  name: "Swiper",
  props: ["list"],
  data() {
    return { swiper: {} };
  },
  mounted() {
    this.initswiper();
  },
  methods: {
    //代理点击事件（更改和删除）
    click({ target }) {
      const {
        dataset: { videoid,type, index },
      } = target;
      //如果不是有videoid的就结束
      if (!videoid) return;

      if (type === 'update') {
        //更改
        this.$emit('updatefn',videoid)
      }else if (type === 'del'){
        //删除
        this.$emit('delfn',videoid)
      }

      //激活的索引
      console.log(this.swiper.realIndex);
    },
    //进行初始化
    initswiper() {
      const swiper = new Swiper(".swiper", {
        //无缝滚动
        loop: true,
        //选择的样式种类
        effect: "coverflow",
        //居中
        centeredSlides: true,
        slidesPerView: "auto",
        //样式设置
        coverflowEffect: {
          rotate: 50,
          stretch: 10,
          depth: 600,
          modifier: 1,
          slideShadows: true,
        },
        pagination: true,
        //自动轮播
        autoplay: {
          delay: 5000,
        },
        // 分页
        pagination: {
          el: ".swiper-pagination",
        },

        // 左右按钮
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      });
      this.swiper = swiper;
    },
    //重新建立并移动到最后一个
    reinit() {
      this.swiper.destroy(true, true);
      this.$nextTick(() => {
        //重新初始化swiper
        this.initswiper();
        // 移动到最后一个幻灯片
        this.swiper.slideToLoop(this.list.length - 1);
      });
    },
  },
  components: {},
};
</script>

<style lang="less" scoped>
.swiper {
  width: 100%;
  height: 40vw;
  max-height: 400px;
}

.swiper-slide {
  background-position: center;
  background-size: cover;
  width: 60vw;
  border-radius: 10px;
  box-shadow: 2px 2px 3px 0px #0000008f;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  .topupdate {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(26, 26, 26, 0.192);
    opacity: 0;
    transition: all 0.3s;
    &:hover {
      opacity: 1;
    }
    //中间更改按钮
    .updatebutton {
      font-size: 3em;
      color: rgb(118, 187, 138);
      padding: 20px;
      &:hover {
        color: rgb(18, 243, 78);
        cursor: pointer;
      }
    }
    .delcover {
      position: absolute;
      top: 0;
      right: 0;
      padding: 5px;
      font-size: 1.5em;
      color: rgb(118, 187, 138);
      &:hover {
        color: red;
        cursor: pointer;
      }
    }
  }
}
.swiper-pagination {
  //鼠标穿透
  pointer-events: none;
}
</style>
