<template>
  <div class="head">
    <!-- 占位，侧边栏是固定定位，不占位会被挡住 -->
    <span class="placeholdercl"></span>
    <div class="headcon">
      <!-- 页头模块 -->
      <Pageheader></Pageheader>
      <!-- 小屏使用的导航栏 -->
      <Pageheadersmall></Pageheadersmall>
      <!-- 用户模块 -->
      <User></User>
    </div>
  </div>
</template>

<script>
//引入占位符媒体查询
import "@/mediacss/placeholdercl.css";

import Pageheader from "@/components/header/Pageheader";
import User from "@/components/header/User";
//小屏使用的导航栏
import Pageheadersmall from '@/components/header/Pageheadersmall.vue';

export default {
  name: "Header",
  data() {
    return {};
  },
  components: {
    Pageheader,
    User,
    Pageheadersmall
  },
};
</script>

<style lang="less" scoped>
.head {
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  background-color: white;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.05);
  .headcon {
    display: flex;
    align-items: center;
    justify-content: space-between;
    overflow: hidden;
    flex: 1;
    padding: 0 20px;
    line-height: 60px;
  }
}
</style>
