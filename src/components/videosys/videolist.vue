<template>
  <div>
    <Searchfn
      ref="searchfn"
      @datesearchfn="datesearchfn"
      @titsearchfn="titsearchfn"
    ></Searchfn>
    <Buttoncl
      :filiterdisabled="filiterdisabled"
      :batchisdnum="batchisdnum"
      @clearfiliters="clearfiliters"
      @delbatch="delbatch"
    ></Buttoncl>
    <el-table
      ref="filterTable"
      :data="tableData"
      style="width: 100%"
      :default-sort="{ prop: 'lastupdate', order: 'descending' }"
      @sort-change="sorttable"
      v-loading="loading"
      highlight-selection-row
      @selection-change="handleSelectionChange"
      @filter-change="filterchange"
    >
      <el-table-column type="selection"> </el-table-column>
      <el-table-column
        prop="lastupdate"
        label="更新日期"
        width="160px"
        sortable="custom"
        :sort-orders="['ascending', 'descending']"
      >
      </el-table-column>
      <el-table-column prop="title" label="标题"> </el-table-column>
      <el-table-column prop="type" label="类型"> </el-table-column>
      <el-table-column
        prop="status"
        label="状态"
        :filters="statusfilters"
        :filter-multiple="false"
        column-key="status"
      >
      </el-table-column>
      <el-table-column label="标签">
        <template slot-scope="scope">
          <template v-for="(item, i) in scope.row.classify">
            <el-tag size="mini" :key="i" disable-transitions>{{ item }}</el-tag>
          </template>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            style="margin-right: 10px"
            @click="redacklist(scope.row)"
            type="text"
            >编辑</el-button
          >
          <el-popconfirm
            title="将不可找回，确定删除吗？"
            confirm-button-type="danger"
            @confirm="dellist(scope.row)"
          >
            <el-button slot="reference" type="text" style="color: red"
              >删除</el-button
            >
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 抽屉栏 -->
    <el-drawer
      :v-loading="loading"
      :title="'编辑视频信息(' + rawdata.videoid + ')'"
      :visible.sync="drawer"
      direction="ltr"
      :before-close="handleClose"
      size="auto"
      :destroyOnClose="true"
    >
      <!-- 视频上传组件 -->
      <UploadFile
        @filelistcd="filelistcd"
        :videoid="rawdata.videoid"
        :proplist="rawdata.videolist"
      ></UploadFile>
      <!-- 表单提交模块 -->
      <Formdata
        @updataloading="updataloading"
        @endeve="endeve"
        :propformdata="rawdata"
        :filelist="filelist"
        :delvideolist="delvideolist"
      ></Formdata>
    </el-drawer>

    <Pagination
      ref="pagech"
      :sumpage="sumpage"
      @regetlsit="regetlsit"
    ></Pagination>
  </div>
</template>

<script>
//引入时间格式化插件
import moment from "moment";

//引入视频上传和表单组件
import UploadFile from "@/components/upload/UploadFile.vue";
import Formdata from "@/components/upload/Formdata.vue";
//引入分页
import Pagination from "@/components/videosys/Pagination.vue";
//引入搜索功能
import Searchfn from "@/components/videosys/Searchfn.vue";
//引入按钮组件
import Buttoncl from "@/components/videosys/Buttoncl.vue";

export default {
  name: "Videolist",
  data() {
    return {
      //视频列表
      tableData: [],
      //加载状态
      loading: false,
      //分页
      //总条数
      sumpage: 0,
      //抽屉是否打开
      drawer: false,
      //要编辑的行数据
      rawdata: {},
      //上传组件传来的视频列表
      filelist: [],
      //已经上传完这次要删除的列表
      delvideolist: [],
      //排序
      sortobj: {
        lastupdate: -1,
      },
      //筛选日期范围
      datefiltle: [],
      //要搜索的标题关键字
      titlesearch: "",
      //批量选择的数组
      arrbatchsel: [],
      //状态的筛选
      statusfilters: [
        { text: "连播中", value: "连播中" },
        { text: "已完结", value: "已完结" },
      ],
      //状态列筛选的字段
      statusff: "",
    };
  },
  mounted() {
    //获取视频列表
    this.getvideolist();
  },
  methods: {
    //排序
    sorttable(data) {
      const { order, prop } = data;
      this.sortobj[prop] = order === "descending" ? -1 : 1;
      //重新获取视频列表
      this.getvideolist();
    },
    //获取视频列表
    async getvideolist() {
      this.loading = true;
      //拿到分页组件（子组件）中的当前页和每页条数
      const { currentpage, pagesize } = this.$refs.pagech;
      try {
        const res = await this.$API.videosys.getvideolist({
          page: currentpage,
          pagesize: pagesize,
          sortobj: this.sortobj,
          datefiltle: this.datefiltle,
          titlesearch: this.titlesearch,
          statusff: this.statusff,
        });
        this.loading = false;
        //视频列表
        this.tableData = res.data.arrlist;
        //总共有多少条
        this.sumpage = res.data.sumpage;
      } catch (error) {
        this.loading = false;
        this.tableData = [];
        this.sumpage = 0;
      }
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
    updataloading(status) {
      this.loading = status;
    },
    //表单上传结束操作
    endeve() {
      //关闭抽屉
      this.drawer = false;
      //重新获取视频列表
      this.getvideolist();
    },
    //接收UploadFile子组件的文件列表和已经上传完这次要删除的列表
    filelistcd(filelist, delvideolist) {
      this.filelist = filelist;
      this.delvideolist = delvideolist;
    },
    //分页组件触发的函数，重新获取列表
    regetlsit() {
      //重新获取视频列表
      this.getvideolist();
    },
    //子组件Searchfn触发的方法，筛选日期范围
    datesearchfn(data) {
      this.datefiltle = data;
      //重新获取视频列表
      this.getvideolist();
    },
    //子组件Searchfn触发的方法，搜索标题
    titsearchfn(data) {
      this.titlesearch = data;
      //重新获取视频列表
      this.getvideolist();
    },
    //拿到批量选择的数组
    handleSelectionChange(data) {
      this.arrbatchsel = data;
    },
    //清空筛选
    clearfiliters() {
      //清除搜索的筛选
      this.$refs.searchfn.chclearfiliter();
      this.datefiltle = [];
      this.titlesearch = "";
      //清除表头的筛选
      this.statusff = "";
      this.$refs.filterTable.clearFilter();
      //重新获取视频列表
      this.getvideolist();
    },
    //批量删除
    async delbatch() {
      const arr = this.arrbatchsel.map((e) => {
        return e.videoid;
      });
      try {
        //提示框
        await this.$confirm("此操作将永久删除这些文件, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        });
        //进行批量删除
        try {
          const ress = await this.$API.videosys.dellistbatch(arr);
          //重新获取视频列表
          this.getvideolist();
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        } catch (error) {
          console.log(error);
        }
      } catch (error) {
        this.$message({
          type: "info",
          message: "已取消删除",
        });
      }
    },
    //筛选
    filterchange(data) {
      //状态列筛选的字段
      this.statusff = data.status[0];
      //重新获取视频列表
      this.getvideolist();
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
  computed: {
    //有筛选的属性时再解开禁用
    filiterdisabled() {
      if (
        this.datefiltle.length === 0 &&
        this.titlesearch === "" &&
        !this.statusff
      )
        return true;
      return false;
    },
    //批量选择的条数
    batchisdnum() {
      return this.arrbatchsel.length;
    },
  },
  components: {
    UploadFile,
    Formdata,
    Pagination,
    Searchfn,
    Buttoncl,
  },
};
</script>

<style lang="less" scoped>
.cell {
  .el-tag {
    margin: 10px 10px 0 0;
  }
}

.el-table {
  overflow: visible;
  border-radius: 10px;
  padding-top: 10px;
  box-shadow: 1px 1px 4px #d2d2d2;
  margin-bottom: 55px;

  /deep/tr {
    background: none;
  }

  /deep/th {
    background: none;
  }

  /deep/.el-table__header-wrapper {
    position: sticky;
    top: 55px;
    z-index: 10;
    background: linear-gradient(#fff 80%, rgba(255, 255, 255, 0.8) 100%);
  }
}
</style>
