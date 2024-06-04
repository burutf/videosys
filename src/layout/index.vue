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
    text-align: center;
    
}


body>.el-container {
    margin-bottom: 40px;
}

.home{
    // min-height: 500px;
    min-width: 900px;
}
</style>