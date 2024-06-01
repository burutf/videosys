<template>
    <div class="home">
        <el-container>
            <!-- 侧边栏 -->
            <el-aside width="auto">
                <Aside></Aside>
            </el-aside>
            <el-container>
                <!-- 头部 -->
                <el-header>
                    <Header></Header>
                </el-header>
                <!-- 主体 -->
                <router-view></router-view>
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
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
}

.el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
}

.el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
}

body>.el-container {
    margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
    line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
    line-height: 320px;
}

.home{
    height: 500px;
}
</style>