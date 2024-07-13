<template>
  <div class="aside">
    <!-- 这里是控制显示隐藏的 -->
    <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
            <el-radio-button :label="false">展开</el-radio-button>
            <el-radio-button :label="true">收起</el-radio-button>
        </el-radio-group> -->

    <!-- 把路由数组渲染出来 -->
    <el-menu
      :default-active="routeindex"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      :router="true"
    >
      <!-- 这里是上传界面 -->
      <router-link :to="{ path: '/video-upload' }">
        <el-button
          class="buttonupload"
          :class="{ routejh: uploadrouterjh }"
          type="primary"
        >
          <i class="el-icon-upload el-icon--right">上传</i>
        </el-button>
      </router-link>

      <!-- 动态渲染路由 -->
      <template v-for="(item, index) in navdatatwo">
        <el-menu-item
          :key="index"
          :index="'/' + item.path"
        >
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
import routes from '@/router/routes';
import { mapState } from 'vuex';

export default {
  name: "Aside",
  data() {
    return {
      isCollapse: false,
      //初步筛选的路由数组
      navdata: [],
    };
  },
  mounted() {
    //拿到关于导航栏的路由数组
    //在路由数组中有设置meta，通过判断meta拿到导航栏渲染数组
    this.navdata = routes.filter((e)=>{
      return e.meta.aside
    })[0].children
  },
  methods:{

  },
  computed: {
    //拿到用户信息
    ...mapState(['userinfo']),
    //获取当前的url，并点亮对应的导航
    routeindex() {
      return this.$route.path;
    },
    //单独做了一个计算属性，来点亮上传按钮
    uploadrouterjh() {
      const buttonpath = "/" + this.$router.options.routes[0].children[0].path
      return this.routeindex.includes(buttonpath)
    },
    // 对路由数组进行二次筛选
    navdatatwo(){
      const arrroutes = this.navdata.filter(e=>{
        if (e.meta.shownav) {
          //auth 表示权限级别 数字越大越牛
          //看当前用户属于哪个级别，级别够就可以访问
          if (this.userinfo.auth>=e.meta.auth) {
            return true
          }
        }
      })
      return arrroutes
    }
  },
};
</script>

<style lang="less" scoped>
.aside {
  position: fixed;
  top: 0;
  left: 0;
  width: 200px;
  height: 100vh;
  text-align: center;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.05);
  
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 100%;
  height: 100%;
}
//删掉右边边框
.el-menu {
  border: 0;
}
.buttonupload {
  margin: 20px 0;
}
//上传按钮被点亮时的样式
.routejh {
  color: rgb(250, 209, 4);
}
</style>