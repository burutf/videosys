<template>
  <div>
    <h1>{{videoid}}</h1>
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
    //设置路由钩子
    beforeRouteEnter(to, from, next){
      console.log(from);
      //不能随便进入这个组件,只有从上传路由及其子路由可以
      if ((from.path).includes('video-upload')) {
        next()
        return
      }
      next('/')
    },
    methods: {
      
    },
}
</script>

<style lang="less" scoped>

</style>