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
                <div style="padding: 20px;">
                    <router-view></router-view>
                </div>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import Aside from '@/layout/Aside';
import Header from "@/layout/Header";

export default {
    name: 'home',
    components: {
        Aside,
        Header
    }
}
</script>

<style lang="less" scoped>
.el-header {
    z-index: 10;
    padding: 0;
}

.el-aside {
    z-index: 11;
}


.home{
    min-width: 900px;
}
</style>