<template>
  <div class="headt">
    <!-- 大屏显示 -->
    <el-page-header
      class="pageheader"
      @back="goBack"
      :content="content"
    ></el-page-header>
    
  </div>
</template>

<script>

export default {
  name: "pageheader",
  methods: {
    
    //返回按钮
    goBack() {
      this.$router.go(-1);
    },
    
  },
  computed: {
    content() {
      return this.$route.name;
    },
  },
};
</script>

<style lang="less" scoped>



.headt {
  display: flex;
  align-items: center;
  color: #333;
  line-height: 60px;
  height: 60px;
  
}


@media (max-width: 560px) {
  .headt {
    display: none;
  }
}
</style>
