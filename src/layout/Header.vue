<template>
  <div class="head">
    <!-- 占位，侧边栏是固定定位，不占位会被挡住 -->
    <span style="width: 200px"></span>
    <!-- 页头模块 -->
    <Pageheader></Pageheader>
    <!-- 用户模块 -->
    <User></User>
  </div>
</template>

<script>
import Pageheader from '@/components/header/Pageheader'
import User from "@/components/header/User";

export default {
  name: "Header",
  data() {
    return {
      
    };
  },
  components: {
    Pageheader,
    User,
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
  width: 100%;
  min-width: 900px;
  background-color: white;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.05);
  
}
</style>