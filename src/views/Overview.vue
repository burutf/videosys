<template>
  <div>
    <div class="chartsdiv">
      <!-- ref的值可以随便写 -->

      <!-- 视频统计图表 -->
      <Videocharts ref="videostatistics"></Videocharts>

      <!-- 用户状态图表 -->
      <Userscharts v-if="userinfo.auth >= 10" ref="Userscharts"></Userscharts>

      <!-- oss存储状态图表 -->
      <Ossbucketcharts
        v-if="userinfo.auth >= 10"
        ref="Ossbucketcharts"
      ></Ossbucketcharts>
    </div>
  </div>
</template>

<script>
//视频统计图表
import Videocharts from "@/components/charts/Videocharts";
//用户状态图表
import Userscharts from "@/components/charts/Userscharts";
//oss存储状态图表
import Ossbucketcharts from "@/components/charts/Ossbucketcharts.vue";

import { mapState } from "vuex";

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
    Videocharts,
    Userscharts,
    Ossbucketcharts,
  },
};
</script>

<style lang="less" scoped>
@media (max-width: 1025px) {
  .chartsdiv{
    grid-template-columns: repeat(1, 1fr);
  }
}
@media (min-width: 1025px) {
  .chartsdiv{
    grid-template-columns: repeat(2, 1fr);
  }
}

.chartsdiv {
  display: grid;
  //行列间距
  grid-gap: 20px;
  .el-card{
    height: 260px;
  }
  /deep/.el-card__body {
    padding: 15px;
    height: 100%;
  }
}
</style>
