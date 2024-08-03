<template>
  <div style="padding: 20px;">
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

    <Videolist
      :tableData="tableData"
      v-loading="loading"
      @sorttable="sorttable"
      @handleSelectionChange="handleSelectionChange"
      @filterchange="filterchange"
    >
      <!-- 插槽(操作那栏的) -->
      <template v-slot="{ scope }">
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            更改<i class="el-icon-arrow-down"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <el-button
                class="el-icon-plus"
                @click="redacklist(scope.row)"
                type="text"
              >
                更新
              </el-button>
            </el-dropdown-item>
            <el-dropdown-item>
              <el-button
                class="el-icon-setting"
                @click="setting(scope.row)"
                type="text"
              >
                设置
              </el-button>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

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
    </Videolist>

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
        @rannanoid="rannanoid"
      ></UploadFile>
      <!-- 表单提交模块 -->
      <Formdata
        @updataloading="updataloading"
        @endeve="endeve"
        :propformdata="rawdata"
        :filelist="filelist"
        :delvideolist="delvideolist"
        :ranid="ranid"
      ></Formdata>
    </el-drawer>

    <!-- 设置栏 -->
    <el-dialog
      title="设置"
      :visible.sync="dialogVisible"
      width="50%"
      @close="dialogclose"
    >
      <Setting :rawdata="rawdata"></Setting>
    </el-dialog>

    <!-- 分页 -->
    <Pagination
      :sumpage="sumpage"
      :pagesize="pagesize"
      :currentpage="currentpage"
      @regetlsit="regetlsit"
    ></Pagination>
  </div>
</template>

<script>
import Videolist from "@/components/videosys/Videolist.vue";
//引入分页
import Pagination from "@/components/videosys/Pagination.vue";
//引入搜索功能
import Searchfn from "@/components/videosys/Searchfn.vue";
//引入按钮组件
import Buttoncl from "@/components/videosys/Buttoncl.vue";
//引入视频上传和表单组件
import UploadFile from "@/components/upload/UploadFile.vue";
import Formdata from "@/components/upload/Formdata.vue";
//引入时间格式化插件
import moment from "moment";
//引入设置栏
import Setting from "@/components/videosys/Setting.vue";

export default {
  name: "Videosys",
  data() {
    return {
      //视频列表
      tableData: [],
      //加载状态
      loading: false,
      //排序
      sortobj: {
        lastupdate: -1,
      },
      //筛选日期范围
      datefiltle: [],
      //要搜索的标题关键字
      titlesearch: "",

      //分页
      //总条数
      sumpage: 0,
      //每页显示条数
      pagesize: 10,
      //当前页数
      currentpage:1,
      //抽屉是否打开
      drawer: false,
      //传递的行数据
      rawdata: {},
      //上传组件传来的视频列表
      filelist: [],
      //已经上传完这次要删除的列表
      delvideolist: [],
      //批量选择的数组
      arrbatchsel: [],
      //状态列筛选的字段
      statusff: "",
      //是否显示设置栏
      dialogVisible: false,
      //上传目录的id
      ranid: "",
    };
  },
  mounted() {
    //获取视频列表
    this.getvideolist();
  },
  methods: {
    //获取视频列表
    async getvideolist() {
      this.loading = true;
      try {
        const res = await this.$API.videosys.getvideolist({
          currentpage: this.currentpage,
          pagesize: this.pagesize,
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
    //抽屉栏的关闭策略
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
          try {
            //清除临时目录
            this.$API.osssys.delosscontents(this.ranid);
          } catch (error) {}

          //重新获取视频列表
          this.getvideolist();
          //清除行数据
          this.rawdata = {};
        })
        .catch((_) => {});
    },
    //子组件Searchfn触发的方法，筛选日期范围
    datesearchfn(data) {
      //将页数变为1
      this.currentpage = 1;
      this.datefiltle = data;
      //重新获取视频列表
      this.getvideolist();
    },
    //子组件Searchfn触发的方法，搜索标题
    titsearchfn(data) {
      //将页数变为1
      this.currentpage = 1;
      this.titlesearch = data;
      //重新获取视频列表
      this.getvideolist();
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
        } catch (error) {}
      } catch (error) {
        this.$message({
          type: "info",
          message: "已取消删除",
        });
      }
    },
    //分页组件触发的函数，重新获取列表
    regetlsit(i) {
      this.currentpage = i
      //重新获取视频列表
      this.getvideolist();
    },
    //接收UploadFile子组件的文件列表和已经上传完这次要删除的列表
    filelistcd(filelist, delvideolist) {
      this.filelist = filelist;
      this.delvideolist = delvideolist;
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
      } catch (error) {}
    },
    //排序
    sorttable(data) {
      const { order, prop } = data;
      this.sortobj[prop] = order === "descending" ? -1 : 1;
      //重新获取视频列表
      this.getvideolist();
    },
    //拿到批量选择的数组
    handleSelectionChange(data) {
      this.arrbatchsel = data;
    },
    //筛选
    filterchange(data) {
      //状态列筛选的字段
      this.statusff = data.status[0];
      //重新获取视频列表
      this.getvideolist();
    },
    //设置视频的一些东西
    setting(data) {
      this.dialogVisible = true;
      this.rawdata = { setting: data.setting, videoid: data.videoid };
      // this.rawdata = { setting: {}, videoid: data.videoid };
    },
    //设置栏关闭时清除行数据
    dialogclose() {
      this.rawdata = {};
      //重新获取视频列表
      this.getvideolist();
    },
    //接收文件上传组件传来的这次上传目录的id名字，传给表单组件，统一上传目录
    rannanoid(ranid) {
      this.ranid = ranid;
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
  watch: {
    //只要检测到列表改变了，就进行格式化日期
    tableData: function (newdata, olddata) {
      this.tableData.forEach((e) => {
        e.lastupdate = moment(e.lastupdate).format("YYYY/MM/DD HH:mm");
      });
    },
  },
  components: {
    Videolist,
    Pagination,
    UploadFile,
    Formdata,
    Searchfn,
    Buttoncl,
    Setting,
  },
};
</script>

<style lang="less" scoped>
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
  margin-right: 7px;
}
.el-dropdown-menu__item {
  padding: 0;
  line-height: normal;
  .el-button {
    padding: 10px 20px;
  }
}
.el-icon-arrow-down {
  font-size: 12px;
}
/deep/.el-dialog {
  min-width: 200px;
}
</style>
