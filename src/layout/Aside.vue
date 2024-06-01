<template>
    <div class="aside">
        <!-- 这里是控制显示隐藏的 -->
        <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
            <el-radio-button :label="false">展开</el-radio-button>
            <el-radio-button :label="true">收起</el-radio-button>
        </el-radio-group> -->

        <!-- 把路由数组渲染出来 -->
        <el-menu :default-active="routeindex" class="el-menu-vertical-demo" :collapse="isCollapse" :router="true">

            <!-- 这里是上传界面 -->
            <router-link :to="{name:'video-upload'}">
                <el-button class="buttonupload" :class="{'routejh':uploadrouterjh}" type="primary">
                    <i class="el-icon-upload el-icon--right">上传</i>
                </el-button>
            </router-link>

            <!-- 做一个块，看看有没有子路由，有的话就显示下面那个    目前还没有使用 -->
            <template v-for="(item, index) in navdata">
                <el-menu-item :key="index" :index="'/' + item.path" v-if="!item.children&&!item.meta">
                    <i :class="item.iconClass"></i>
                    <span slot="title">{{ item.title }}</span>
                </el-menu-item>

                <el-submenu :key="index" v-if="!!item.children">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span slot="title">{{ item.title }}</span>
                    </template>
                    <!-- 这里子路由的路由路径还有问题，需要获取父元素的path拼接上才行   先不做，目前用不到 -->
                    <el-menu-item v-for="(itemi, index) in item.children" :key="index" :index="'/' + itemi.path">{{
            itemi.title
                        }}</el-menu-item>
                </el-submenu>
            </template>

        </el-menu>
    </div>
</template>

<script>
export default {
    name: "Aside",
    data() {
        return {
            isCollapse: false,
            navdata: [],
        };
    },
    mounted() {
        //拿到关于导航栏的路由数组
        this.navdata = this.$router.options.routes[0].children;
    },
    computed:{
        //获取当前的url，并点亮对应的导航
        routeindex(){
            return this.$route.path;
        },
        //单独做了一个计算属性，来点亮上传按钮
        uploadrouterjh(){
            return this.routeindex === "/"+this.$router.options.routes[0].children[0].path;
        }
    }
};
</script>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    height: 100vh;
}

.buttonupload {
    margin: 20px 0;
}
//上传按钮被点亮时的样式
.routejh{
    color: rgb(250, 209, 4);
}
</style>