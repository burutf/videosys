<template>
  <div class="block">
    <el-pagination layout="prev, pager, next" :total="sumpage" :page-size="pagesize" :current-page="currentpage"
      @current-change="changepage">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'pagination',
  //总条数
  props: ['sumpage'],
  data() {
    return {
      //每页显示条数
      pagesize: 10,
      //当前页数
      currentpage: 1
    }
  },
  methods: {
    changepage(i) {
      this.currentpage = i
      this.$emit('regetlsit')
    }
  }
}
</script>

<style lang="less" scope>
  .block{
    display:flex;
    justify-content: center;
    z-index:30;
  }
</style>