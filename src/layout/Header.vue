<template>
  <div class="head">
    <span style="width: 200px"></span>
    <div class="headt">
      <span>
        <el-page-header @back="goBack" :content="content"> </el-page-header>
      </span>
    </div>
  </div>
</template>

<script>

export default {
  name: "Header",
  data(){
    return{
        
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
  },
  computed:{
    content(){
        return this.$route.name
    }
  }
};
</script>

<style lang="less" scoped>
.head {
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: white;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.05);
  .headt {
    flex: 1;
    color: #333;
    line-height: 60px;
    display: flex;
    align-items: center;
    height: 60px;
    padding: 0 20px;
  }
}
</style>