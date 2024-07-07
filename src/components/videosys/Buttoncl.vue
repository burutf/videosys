<template>
  <div class="buttoncl">
    <el-button :disabled="filiterdisabled" size="small" @click="clearfiliters"
      >清空筛选</el-button
    >
    <el-button
      type="danger"
      icon="el-icon-delete"
      @click="delbatch"
      size="small"
      :disabled="batchisdnum===0"
      >批量删除</el-button
    >
    <span v-show="batchisdnum !== 0">{{ batchisdnum }}条</span>
  </div>
</template>

<script>
export default {
  name: "buttoncl",
  props:["filiterdisabled","batchisdnum"],
  data() {
    return {
        
    }
  },
  methods:{
    clearfiliters(){
        this.$emit('clearfiliters')
    },
    delbatch(){
        this.$emit('delbatch')
    }
  }
};
</script>

<style lang="less" scoped>
.buttoncl {
  margin-bottom: 10px;

  span {
    font-size: 0.8em;
    color: #4b4b4b;
    margin-left: 5px;
  }
}
</style>
