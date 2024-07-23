<template>
  <div class="home">
    <el-container>
      <!-- 侧边栏 -->
      <el-aside class="sidebar" width="">
        <Aside></Aside>
      </el-aside>
      <el-container class="rightbox">
        <!-- 头部 -->
        <el-header>
          <Header></Header>
        </el-header>
        <!-- 主体 -->
        <div style="padding: 20px; position: relative">
          <!-- 上传组件保持存活 -->
          <keep-alive include="Uploadsys">
            <router-view></router-view>
          </keep-alive>
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

  methods: {},
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
  margin: 0;
}
.el-aside {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  background-color: #ffffff;
  padding-top: 10px;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.05);
  text-align: center;
}

//侧边栏
.sidebar {
  width: 200px;
  height: 100vh;
}
//右边的头部和主体盒子
.rightbox {
  margin-left: 200px;
}

@media (max-width: 1025px) {
  //侧边栏
  .sidebar {
    height: 100vh;
    width: 100px;
  }
  //右边的头部和主体盒子
  .rightbox {
    margin-left: 100px;
  }
}
@media (max-width: 560px) {
  //侧边栏
  .sidebar {
    display: none;
  }
  //右边的头部和主体盒子
  .rightbox {
    margin-left: 0px;
  }
}
</style>
