<template>
  <div class="home">
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200px">
        <Aside></Aside>
      </el-aside>
      <el-container>
        <!-- 头部 -->
        <el-header>
          <Header></Header>
        </el-header>
        <!-- 主体 -->
        <div style="padding: 20px;position: relative;">
          <router-view></router-view>
        </div>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Aside from "@/layout/Aside";
import Header from "@/layout/Header";

export default {
  name: "home",
  data() {
    return {};
  },
  
  methods: {
    
  },
  components: {
    Aside,
    Header,
  },
};
</script>

<style lang="less" scoped>
.el-header {
  z-index: 999;
  padding: 0;
}
.el-aside {
  z-index: 1000;
}

.home {
  min-width: 900px;
}
</style>