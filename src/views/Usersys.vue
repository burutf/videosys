<template>
  <div style="padding: 20px;">
    <Searchfn
      ref="searchfn"
      @datesearchfn="datesearchfn"
      @titsearchfn="titsearchfn"
    ></Searchfn>
    <Adduser @adduserup="adduserup" :authlists="authlists"></Adduser>

    <Userlist
      v-loading="loading"
      :tableauthlists="tableauthlists"
      :tableData="tableData"
      :authlists="authlists"
      @filterchange="filterchange"
      @sorttable="sorttable"
    >
      <!-- 插槽（操作） -->
      <template v-slot="{ scope }">
        <el-dropdown trigger="click" @command="clickdropdown">
          <span class="el-dropdown-link">
            更改<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item :command="{ item: 'authitem', row: scope.row }"
              >权限</el-dropdown-item
            >
            <el-dropdown-item :command="{ item: 'passitem', row: scope.row }"
              >密码</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>

        <el-popconfirm
          title="将不可找回，确定删除吗？"
          confirm-button-type="danger"
          @confirm="dellist(scope.row)"
        >
          <el-button slot="reference" type="text" style="color: red">
            删除
          </el-button>
        </el-popconfirm>
      </template>
    </Userlist>

    <!-- 修改的弹出框 -->
    <Updatedialog
      :dialogFormVisible="dialogFormVisible"
      @close="close"
      @relist="relist"
      :userinfo="userinfo"
      :uptype="uptype"
      :authlists="authlists"
    ></Updatedialog>
    <!-- 分页组件 -->
    <Pagination
      ref="pagech"
      :sumpage="sumpage"
      @regetlsit="regetlsit"
    ></Pagination>
  </div>
</template>

<script>
import Adduser from "@/components/user/Adduser.vue";
import Updatedialog from "@/components/user/Updatedialog.vue";
//引入时间格式化插件
import moment from "moment";

//引入分页
import Pagination from "@/components/videosys/Pagination.vue";
//引入搜索功能
import Searchfn from "@/components/videosys/Searchfn.vue";
//引入按钮组件
import Buttoncl from "@/components/videosys/Buttoncl.vue";
//引入用户列表组件
import Userlist from "@/components/user/Userlist.vue";

export default {
  name: "Usersys",
  data() {
    return {
      //用户列表
      tableData: [],
      //加载
      loading: false,
      //修改信息弹出框状态
      dialogFormVisible: false,
      //要传递弹出框组件的信息
      userinfo: {},
      //要更改的类型
      uptype: "",
      //权限列表
      authlists: [],
      //表格筛选使用的权限列表
      tableauthlists: [],
      //总页数
      sumpage: 0,
      //筛选日期范围
      datefiltle: [],
      //要搜索的用户名关键字
      titlesearch: "",
      //权限状态的筛选
      authfil: "",
      //排序
      sortobj: {
        create_date: -1,
      },
    };
  },
  provide() {
    return {
      authli: () => this.authlists,
    };
  },
  mounted() {
    //获取用户列表和权限列表
    this.getlist();
  },
  methods: {
    async getlist() {
      this.loading = true;
      //拿到分页组件（子组件）中的当前页和每页条数
      const { currentpage, pagesize } = this.$refs.pagech;
      try {
        //获取用户列表
        const { data } = await this.$API.userapi.getmongodbusers({
          currentpage,
          pagesize,
          datefiltle: this.datefiltle,
          titlesearch: this.titlesearch,
          authfil: this.authfil,
          sortobj: this.sortobj,
        });
        if (this.authlists.length === 0) {
          //获取权限列表
          const ress2 = await this.$API.userapi.getauthlist();
          this.authlists = ress2.data;
        }
        //用户列表
        this.tableData = data.arrlist;
        //用户分页总条数
        this.sumpage = data.sumpage;
        this.loading = false;
      } catch (error) {
        this.loading = false;
        this.tableData = [];
        this.sumpage = 0;
      }
    },
    //更改下拉列表点击事件
    clickdropdown(item) {
      this.uptype = item.item;
      this.userinfo = item.row;
      this.dialogFormVisible = true;
    },
    //关闭弹出框
    close() {
      this.dialogFormVisible = false;
      //清除信息
      this.clearinfo();
    },
    //刷新列表
    relist() {
      //获取用户列表和权限列表
      this.getlist();
    },
    //清除信息
    clearinfo() {
      //要传递弹出框组件的信息
      this.userinfo = {};
      //要更改的类型
      this.uptype = "";
    },
    //删除
    async dellist(row) {
      try {
        await this.$API.userapi.deluser(row.uuid);
        this.$message({
          message: "删除用户成功",
          type: "success",
        });
      } catch (error) {
        this.$message({
          message: "删除用户失败",
          type: "error",
        });
      }
      //获取用户列表和分页
      this.getlist();
    },

    //新增用户完成刷新列表
    adduserup() {
      //获取用户列表和分页
      this.getlist();
    },
    //分页组件触发函数
    regetlsit() {
      //获取用户列表
      this.getlist();
    },
    //子组件Searchfn触发的方法，筛选日期范围
    datesearchfn(data) {
      //将页数变为1
      this.$refs.pagech.setpageone();
      this.datefiltle = data;
      //获取用户列表
      this.getlist();
    },
    //子组件Searchfn触发的方法，搜索标题
    titsearchfn(data) {
      //将页数变为1
      this.$refs.pagech.setpageone();
      this.titlesearch = data;
      //获取用户列表
      this.getlist();
    },
    //筛选
    filterchange(data) {
      //将页数变为1
      this.$refs.pagech.setpageone();
      //状态列筛选的字段
      this.authfil = data.auth[0];
      //重新获取视频列表
      this.getlist();
    },
    //排序
    sorttable(data) {
      const { order, prop } = data;
      this.sortobj[prop] = order === "descending" ? -1 : 1;
      //重新获取视频列表
      this.getlist();
    },
  },
  watch: {
    //只要检测到列表改变了，就进行格式化日期
    tableData: function () {
      this.tableData.forEach((e) => {
        e.create_date = moment(e.create_date).format("YYYY/MM/DD HH:mm");
      });
    },
    //监测权限列表，获取到数据了，就更新一个能让表格筛选使用的权限列表
    authlists: function () {
      const arr = this.authlists.map((e) => {
        return {
          text: e.label,
          value: e.value,
        };
      });
      this.tableauthlists = arr;
    },
  },
  components: {
    Adduser,
    Updatedialog,
    Pagination,
    Searchfn,
    Buttoncl,
    Userlist,
  },
};
</script>

<style lang="less" scoped>
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
  margin-right: 7px;
}
.el-icon-arrow-down {
  font-size: 12px;
  margin: 0;
}
</style>
