<template>
  <div class="block">
    <span style="width: 200px;height: 0;"></span>
    <el-pagination layout="total,prev, pager, next" :total="sumpage" :page-size="pagesize" :current-page="currentpage"
      @current-change="changepage" v-show="isshow">
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
      currentpage: 1,
    }
  },
  methods: {
    changepage(i) {
      this.currentpage = i
      this.$emit('regetlsit')
    },
    //页数变为1
    setpageone(){
      this.currentpage = 1
    }
  },
  computed: {
    //是否显示分页
    isshow() {
      return this.sumpage > this.pagesize
    }
  }
}
</script>

<style lang="less" scope>
.block {
  position: fixed;
  bottom: 35px;
  left: 0;
  width: 100vw;
  min-width: 900px;
  display: flex;

  //分页功能条样式
  .el-pagination {
    flex: 1;
    display: flex;
    justify-content: center;
    z-index: 300;
    padding: 0;

    //左边的箭头
    .btn-prev {
      background: none;

      .el-icon-arrow-left:before {
        content: '\e792';
        font-size: 1.3em;
      }
    }

    .el-pager {

      //中间的按钮
      .number {
        background-color: rgb(255, 255, 255);
        box-shadow: 1px 1px 5px rgb(184, 184, 184);
        border-radius: 50%;
        margin: 0 5px;
        height: 30px;
        width: 30px;
        min-width: auto;
        line-height: 30px;
        transition: all 0.2s;

        //激活的按钮
        &.active {
          box-shadow: 0px 0px 3px rgb(192, 192, 192);
        }
      }
    }

    //右边的箭头
    .btn-next {
      background: none;

      .el-icon-arrow-right:before {
        content: '\e791';
        font-size: 1.3em;
      }
    }
  }

}
</style>