<template>
  <div>
    <div class="chartsdiv">
      <!-- ref的值可以随便写 -->

      <!-- 视频统计图表 -->
      <Videostatistics ref="videostatistics"></Videostatistics>

      <!-- 用户状态图表 -->
      <Usersstatistics v-if="userinfo.auth>=10" ref="Usersstatistics"></Usersstatistics>

    </div>
  </div>
</template>

<script>
//视频统计图表
import Videostatistics from "@/components/charts/Videostatistics";
//用户状态图表
import Usersstatistics from "@/components/charts/Usersstatistics";

import { mapState } from "vuex"

export default {
  name: "Overview",
  data() {
    return {
      //定时器id
      timeoutindex: "",
    };
  },
  mounted() {
    //重写onresize，并且重复触发只执行最后一次
    //当改变窗口大小时，改变图表的大小
    this.winonresize();
  },
  methods: {
    winonresize() {
      window.onresize = () => {
        clearTimeout(this.timeoutindex);
        this.timeoutindex = setTimeout(() => {
          //将refs对象转为存储键的数组
          const list = Object.keys(this.$refs);
          //进行遍历，将所有refs下的图标重新设置大小
          list.map((e) => {
            this.$refs[e].resize();
          });
        }, 500);
      };
    },
  },
  computed: {
    //拿到vuex中的用户信息
    ...mapState(["userinfo"]),
  },
  beforeDestroy() {
    //当离开这里时，不再监听window的窗口变化
    window.onresize = null;
    //清除定时器
    clearTimeout(this.timeoutindex);
  },

  components: {
    Videostatistics,
    Usersstatistics,
  },
};
</script>

<style lang="less" scoped>
.chartsdiv {
  display: grid;
  //   height: 500px;
  grid-template-columns: repeat(2, 1fr);
  //行列间距
  grid-gap: 20px;
  /deep/.el-card__body {
    padding: 15px;
    height: 100%;
  }
}
</style>
