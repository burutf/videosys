<template>
  <div style="margin-bottom: 10px;">
    <el-button @click="adduser">新增用户</el-button>
    <Adddialog @adduserup="adduserup" @close="close" :dialogFormVisible="dialogFormVisible"></Adddialog>
  </div>
</template>

<script>
import Adddialog from '@/components/user/Adddialog.vue'

export default {
  name: "Adduser",
  data() {
    return {dialogFormVisible:false};
  },
  methods: {
    //新增用户
    adduser() {
        this.dialogFormVisible = true
    },
    //关闭
    close(){
        this.dialogFormVisible = false
    },
    //过渡一下
    adduserup(){
        this.$emit('adduserup')
    }
  },
  components:{
    Adddialog
  }
};
</script>

<style lang="less" scoped></style>
