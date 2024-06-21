<template>
  <div class="error">
    <h1>404...还有{{ num }}秒为您返回主页</h1>
  </div>
</template>

<script>
export default {
  name: "Erroe",
  data(){
    return{
        //设置返回的秒数
        num:5,
        //定时器id
        timeid:''
    }
  },
  mounted(){
    this.returnhome()
  },
  methods: {
    returnhome(){
        const inin = setInterval(() => {
            this.num--
        }, 1000);
        this.timeid = inin
    }
  },
  watch:{
    num:function(y,o){
        if (y===0) {
            clearInterval(this.timeid)
            this.$router.push('/')
        }
    }
  }
};
</script>

<style lang="less" scoped>
.error{
    padding: 20px;
}
</style>