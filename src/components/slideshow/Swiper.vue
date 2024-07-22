<template>
  <div class="swiper" @click="click">
    <div class="swiper-wrapper">
      <div v-for="(e, i) of list" :key="i" class="swiper-slide">
        <!-- 图片展示区 -->
        <img
          v-show="e.coverurl"
          class="imgcls"
          :src="e.coverurl"
        />
        <!-- 没有设置图片时展示的 -->
        <div v-show="!e.coverurl" class="pla">
          <span>暂无图片</span>
        </div>
        <!-- 文字展示区 -->
        <div class="introduce">
          <h2>{{ e.aggarr.title }}</h2>
          <span>{{ e.aggarr.status }}</span>
          <p>
            {{ e.aggarr.desc }}
          </p>
        </div>

        <!-- 只有当前激活的才会显示这里 -->
        <div class="topupdate" v-show="actindex === i">
          <!-- 更换按钮 -->
          <UploadCover @covername="covername($event, e.videoid, e.coverurl)">
            <i :data-index="i" class="el-icon-refresh updatebutton"></i>
          </UploadCover>
          <!-- 删除按钮 -->
          <i
            class="el-icon-circle-close delcover"
            :data-videoid="e.videoid"
            data-type="del"
          ></i>
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

import UploadCover from "@/components/upload/UploadCover.vue";

export default {
  name: "Swiper",
  props: ["list"],
  data() {
    return { swiper: null };
  },
  mounted() {
    this.initswiper();
  },
  methods: {
    //代理点击事件（更改和删除）
    click({ target }) {
      const {
        dataset: { videoid, type, index },
      } = target;

      //如果不是有videoid的就结束
      if (!videoid) return;

      if (type === "del") {
        //删除
        this.$emit("delfn", videoid);
      }
    },
    //进行初始化
    initswiper() {
      let isloop = false;
      //大于3张才会开启循环
      // if (this.list.length > 3) {
      //   isloop = true;
      // }
      this.swiper = new Swiper(".swiper", {
        //无缝滚动
        loop: isloop,
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
        // autoplay: {
        //   delay: 5000,
        // },
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
    },
    //重新建立
    reinit() {
      this.$nextTick(() => {
        //重新初始化swiper
        // this.initswiper();
        this.swiper.update();
      });
    },
    //进行更改图片
    covername(imgobj, videoid, coverurl) {
      this.$emit("updatefn", imgobj, videoid, coverurl);
    },
  },
  beforeDestroy() {
    if (this.swiper) {
      this.swiper.destroy();
    }
  },
  computed: {
    //当前激活的索引，初始化时设置为0
    actindex() {
      try {
        return this.swiper.realIndex;
      } catch (error) {
        return 999;
      }
    },
  },
  components: { UploadCover },
};
</script>

<style lang="less" scoped>
.swiper {
  width: 100%;
  height: 40vw;
  max-height: 400px;
}

.swiper-slide {
  position: relative;
  background-position: center;
  background-size: cover;
  width: 60vw;
  border-radius: 10px;
  box-shadow: 2px 2px 3px 0px #0000008f;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border: 1px solid rgba(118, 118, 118, 0.329);
  .imgcls {
    position: absolute;
    width: 100%;
    height: 100%;
    
  }

  .imgcls::before {
    content: "图片加载出错，请重新上传";
    display: block;
    width: 100%;
    height: 100%;
    display:flex;
    justify-content: center;
    align-items: center;
    color: rgba(255, 0, 0, 0.592)
  }
  .topupdate {
    position: absolute;
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
      color: rgb(74, 74, 74);
      padding: 10px;
      background-color: #ffffffc0;
      border-radius: 50px;
      overflow: hidden;
      &:hover {
        color: rgb(18, 243, 78);
        cursor: pointer;
      }
    }
    .delcover {
      position: absolute;
      top: 5px;
      right: 5px;
      font-size: 1.5em;
      color: rgb(74, 74, 74);
      background-color: #ffffffc0;
      border-radius: 50px;
      &:hover {
        color: red;
        cursor: pointer;
      }
    }
  }
  .introduce {
    position: absolute;
    bottom: 5px;
    left: 5px;
    width: 50%;
    height: 40%;
    // background-color: rgb(0, 0, 0);
    overflow: hidden;
    h2 {
      color: rgba(255, 255, 255, 0.89);
      margin: 10px 0;
    }
    span {
      color: rgba(255, 255, 255, 0.914);
    }
    p {
      margin: 8px 0;
      color: rgba(255, 255, 255, 0.914);
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2; //多行在这里修改数字即可
      overflow: hidden;
      /* autoprefixer: ignore next */
      -webkit-box-orient: vertical;
    }
  }
}
.pla {
  background-color: rgba(26, 26, 26, 0.192);
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgb(77, 77, 77);
  font-size: 1.5em;
}

.swiper-pagination {
  //鼠标穿透
  pointer-events: none;
}
</style>
