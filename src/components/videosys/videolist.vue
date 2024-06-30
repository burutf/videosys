<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="lastupdate" label="上传日期" width="160px">
      </el-table-column>
      <el-table-column prop="title" label="标题"> </el-table-column>
      <el-table-column prop="type" label="类型"> </el-table-column>
      <el-table-column prop="status" label="状态"> </el-table-column>
      <el-table-column label="标签">
        <template slot-scope="scope">
          <template v-for="(item, i) in scope.row.classify">
            <el-tag size="mini" :key="i">{{ item }}</el-tag>
          </template>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="redacklist(scope.row)" type="text">编辑</el-button>
          <el-button @click="dellist(scope.row)" type="text">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 抽屉栏 -->
    <el-drawer
      :v-loading="loading"
      :title='"编辑视频信息("+rawdata.videoid+")"'
      :visible.sync="drawer"
      direction="ltr"
      :before-close="handleClose"
      size="auto"
      :destroyOnClose="true"
    >
      <!-- 视频上传组件 -->
      <UploadFile @filelistcd="filelistcd" :videoid="rawdata.videoid" :proplist="rawdata.videolist"></UploadFile>
      <!-- 表单提交模块 -->
      <Formdata @updataloading="updataloading" @endeve="endeve" :propformdata="rawdata" :filelist="filelist" :delvideolist="delvideolist"></Formdata>
    </el-drawer>
  </div>
</template>

<script>
//引入时间格式化插件
import moment from "moment";

//引入视频上传和表单组件
import UploadFile from "../upload/UploadFile.vue";
import Formdata from "../upload/Formdata.vue";

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
      page: 1,
      //每页条数
      pagesize: 10,
      //总条数
      sumpage: 0,
      //抽屉是否打开
      drawer: false,
      //要编辑的行数据
      rawdata: {},
      //上传组件传来的视频列表
      filelist:[],
      //已经上传完这次要删除的列表
      delvideolist:[],
    };
  },
  mounted() {
    //获取视频列表
    this.getvideolist();
  },
  methods: {
    //获取视频列表
    async getvideolist() {
      try {
        const res = await this.$API.videosys.getvideolist(this.options);
        //视频列表
        this.tableData = res.data.arrlist;
        //总共有多少条
        this.sumpage = res.data.sumpage;
      } catch (error) {}
    },
    //编辑列表中一条
    redacklist(data) {
      this.drawer = true;
      this.rawdata = data;
    },
    //删除列表中的一条
    async dellist(data) {
      try {
        const ress = await this.$API.videosys.dellist(data.videoid);
        //重新获取视频列表
        this.getvideolist();
      } catch (error) {
        console.log(error);
      }
    },
    //抽屉栏的关闭策略
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
          //重新获取视频列表
          this.getvideolist();
        })
        .catch((_) => {});
    },
    //接收Formdata子组件的上传状态，设置加载的值
    updataloading(status){
      this.loading = status
    },
    //表单上传结束操作
    endeve(){
      //关闭抽屉
      this.drawer = false
      //重新获取视频列表
      this.getvideolist();
    },
    //接收UploadFile子组件的文件列表和已经上传完这次要删除的列表
    filelistcd(filelist,delvideolist){
      this.filelist = filelist
      this.delvideolist = delvideolist
    },
  },
  computed: {
    //将分页属性组合成对象
    options() {
      return {
        page: this.page,
        pagesize: this.pagesize,
      };
    },
  },
  watch: {
    //只要检测到列表改变了，就进行格式化日期
    tableData: function (newdata, olddata) {
      this.tableData.forEach((e) => {
        e.lastupdate = moment(e.lastupdate).format("YYYY/MM/DD HH:mm");
      });
    },
  },
  components: {
    UploadFile,
    Formdata
  },
};
</script>

<style lang="less" scoped>
.cell {
  .el-tag {
    margin: 10px 10px 0 0;
  }
}
</style>