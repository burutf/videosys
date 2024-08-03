<template>
  <div>
    <!-- 这里是控制显示隐藏的 -->
    <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
      <el-radio-button :label="false">展开</el-radio-button>
      <el-radio-button :label="true">收起</el-radio-button>
    </el-radio-group> -->

    <a href="/"
      ><h1 class="logoh1">
        <span>视频</span>
        <img src="../assets/logo.png" style="width: 40px; height: 40px" /><span
          >后台</span
        >
      </h1></a
    >
    <!-- 这里是上传界面 -->
    <router-link :to="{ path: '/video-upload' }">
      <el-button
        class="buttonupload upbutton"
        :class="{ routejh: uploadrouterjh }"
        type="primary"
      > <div class="flexbox">
        <i class="el-icon-upload el-icon--right"><span>上传</span></i>
      </div>
      </el-button>
    </router-link>

    <!-- 把路由数组渲染出来 -->
    <el-menu
      :default-active="routeindex"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      :router="true"
    >
      <!-- 动态渲染路由 -->
      <template v-for="(item, index) in navdatatwo">
        <el-menu-item :key="index" :index="'/' + item.path">
          <i :class="item.iconClass"></i>
          <span slot="title">{{ item.name }}</span>
        </el-menu-item>

        <!-- 这块是显示子路由的 暂未使用 还有问题 -->
        <!-- <el-submenu :key="index" v-if="!!item.children">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">{{ item.name }}</span>
          </template>
           这里子路由的路由路径还有问题，需要获取父元素的path拼接上才行   先不做，目前用不到
          <el-menu-item
            v-for="(itemi, index) in item.children"
            :key="index"
            :index="'/' + itemi.path"
            >{{ itemi.name }}</el-menu-item
          >
        </el-submenu> -->
      </template>
    </el-menu>
  </div>
</template>

<script>
import {navroutes} from '@/router/routes'

import { mapState } from "vuex";

export default {
  name: "Aside",
  data() {
    return {
      isCollapse: false,
      //路由数组
      navdata: [],
    };
  },
  mounted() {
    this.navdata = navroutes
  },
  methods: {},
  computed: {
    //拿到用户信息
    ...mapState(["userinfo"]),
    //获取当前的url，并点亮对应的导航
    routeindex() {
      return this.$route.path;
    },
    //单独做了一个计算属性，来点亮上传按钮
    uploadrouterjh() {
      const buttonpath = "/" + this.$router.options.routes[0].children[0].path;
      return this.routeindex.includes(buttonpath);
    },
    // 对路由数组进行二次筛选
    navdatatwo() {
      const arrroutes = this.navdata.filter((e) => {
        //判断是不是需要渲染
        if (e.meta.shownav) {
          //auth 表示权限级别 数字越大越牛
          //看当前用户属于哪个级别，级别够就可以访问
          if (this.userinfo.auth >= e.meta.auth) {
            return true;
          }
        }
      });
      return arrroutes;
    },
  },
};
</script>

<style lang="less" scoped>

//当屏幕比较小的时候显示这个上传按钮

.el-menu-item {
  span {
    font-weight: 500;
  }
}
//删掉右边边框
.el-menu {
  border: 0;
}
.buttonupload {
  margin: 25px 0 15px;
}
//上传按钮被点亮时的样式
.routejh {
  color: rgb(242, 239, 27);
}
.logoh1 {
  display: flex;
  color: #00a29a;
  align-items: center;
  justify-content: center;
}




@media (max-width: 1025px) {
  .el-menu-item {
    display: flex;
    align-items: center;
    flex-direction: column;
    line-height: normal;
    height: auto;
    padding-top: 12px;
    padding-bottom: 12px;
    i {
      margin-right: 0;
      margin-bottom: 5px;
    }
  }
  .logoh1 {
    span {
      display: none;
    }
  }
}
</style>
