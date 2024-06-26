<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="lastupdate" label="日期"> </el-table-column>
      <el-table-column prop="title" label="标题"> </el-table-column>
      <el-table-column prop="type" label="类型"> </el-table-column>
      <el-table-column prop="status" label="状态"> </el-table-column>
      <el-table-column prop="classify" label="标签"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="redacklist(scope.row)" type="text">编辑</el-button>
          <el-button @click="dellist(scope.row)" type="text">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "videolist",
  data() {
    return {
      //视频列表
      tableData: [],
      //加载状态
      loading: false,
      //分页
      //第几页
      page:1,
      //每页条数
      pagesize:3
    };
  },
  mounted() {
    //获取视频列表
    this.getvideolist()
  },
  methods: {
    //获取视频列表
    async getvideolist(){
        try {
            const res = await this.$API.videosys.getvideolist(this.options)
            this.tableData = res.data.arrlist
            console.log(res);
        } catch (error) {}
    },
    //编辑列表中一条
    redacklist(data){
      console.log(data);
    },
    //删除列表中的一条
    async dellist(data){
      try {
        const ress = await this.$API.videosys.dellist(data.videoid)
        console.log(ress);
      } catch (error) {
        console.log(error);
      }
    },
  },
  computed:{
    options(){
        return {
            page:this.page,
            pagesize:this.pagesize
        }
    }
  }
};
</script>

<style>
</style>