<template>
  <div>
    <el-result icon="success" title="上传成功" subTitle="继续添加请点击返回">
      <template slot="extra">
        <el-button @click="routergo" type="primary" size="medium">返回</el-button>
      </template>
    </el-result>
  </div>
</template>

<script>
export default {
    name:'UploadStatus',
    data(){
        return{
          videoid:''
        }
    },
    mounted() {
      this.videoid = this.$route.query.videoid
    },
    // 设置路由钩子
    beforeRouteEnter(to, from, next){
      //不能随便进入这个组件,只有从上传路由及其子路由可以
      if ((from.path).includes('video-upload')) {
        next()
        return
      }
      if (!from.name) {
        next("/")
      }else{
        next(to.query.path)
      }
    },
    methods: {
      routergo(){
        //返回上一层
        this.$router.go(-1)
      }
    },
}
</script>

<style lang="less" scoped>

</style>