<template>
  <el-tabs
    v-model="editableTabsValue"
    type="card"
    :closable="closable"
    :addable="addable"
    @edit="handleTabsEdit"
  >
    <el-tab-pane
      :key="item.name"
      v-for="(item, index) in editableTabs"
      :label="item.title"
      :name="item.name"
    >
      <Comupload :tabname="item.name" @successdel="successdel"></Comupload>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import Comupload from "@/components/upload/Comupload.vue";

export default {
  name: "Uploadnew",
  data() {
    return {
      editableTabsValue: "1",
      editableTabs: [
        {
          title: "任务一",
          name: "1",
        },
      ],
      tabIndex: 1,
    };
  },
  //从这里路由离开时的钩子，有数据就弹窗，没有就不管
  // beforeRouteLeave(to, from, next) {
  //   //当前正在上传就不离开
  //   if (this.loading) {
  //     this.$notify({
  //       title: "视频正在上传",
  //       message: "请不要离开",
  //       position: "top-left",
  //       type: "warning",
  //     });
  //     next(false);
  //     return;
  //   }
  //   //如果要跳转到视频上传结果页面就直接跳转,或者是登陆页面
  //   if (to.path === "/video-upload/status" || to.path === "/login") {
  //     next();
  //     return;
  //   }
  //   //如果没有数据就直接离开
  //   if (this.filelist.length === 0) {
  //     next();
  //     return;
  //   }
  //   //根据用户选择离不离开
  //   // this.$confirm(
  //   //   "继续上传要离开吗，系统将不会保留你的信息, 是否继续?",
  //   //   "提示",
  //   //   {
  //   //     confirmButtonText: "确定",
  //   //     cancelButtonText: "取消",
  //   //     type: "warning",
  //   //   }
  //   // )
  //   //   .then(() => {
  //   //     next();
  //   //   })
  //   //   .catch(() => {
  //   //     next(false);
  //   //   });
  //   this.$notify.info({
  //     title: "消息",
  //     message: "您可稍后回来继续上传",
  //     position: "bottom-left",
  //   });
  //   next();
  // },
  methods: {
    async handleTabsEdit(targetName, action, issuccess=true) {
      if (action === "add") {
        let newTabName = ++this.tabIndex + "";
        this.editableTabs.push({
          title: "新建任务",
          name: newTabName,
        });
        this.editableTabsValue = newTabName;
      }
      if (action === "remove") {
        try {
          if (issuccess) {
            await this.$confirm("您确定要删除此任务吗?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning",
            });
          }

          let tabs = this.editableTabs;
          let activeName = this.editableTabsValue;
          if (activeName === targetName) {
            tabs.forEach((tab, index) => {
              if (tab.name === targetName) {
                let nextTab = tabs[index + 1] || tabs[index - 1];
                if (nextTab) {
                  activeName = nextTab.name;
                }
              }
            });
          }

          this.editableTabsValue = activeName;
          this.editableTabs = tabs.filter((tab) => tab.name !== targetName);

          this.$message({
            type: "success",
            message: "此任务删除成功!",
          });
        } catch (error) {}
      }
    },
    //上传成功的回调删除掉这个tab
    successdel(name) {
      this.handleTabsEdit(name, "remove", false);
    },
  },
  watch: {
    //侦听标签数据，当长度为0时，等待页面渲染完成后，进行初始化操作
    editableTabs: {
      handler(newdata) {
        this.$nextTick(() => {
          if (newdata.length === 0) {
            this.editableTabs.push({
              title: "任务一",
              name: "1",
            });
            this.editableTabsValue = "1";
            this.tabIndex = 1;
          }
        });
      },
    },
  },
  computed: {
    //可不可以关闭
    closable() {
      if (this.editableTabs.length > 1) {
        return true;
      } else {
        return false;
      }
    },
    //可不可以添加
    addable() {
      if (this.editableTabs.length <= 5) {
        return true;
      } else {
        return false;
      }
    },
  },
  components: {
    Comupload,
  },
};
</script>

<style lang="less" scoped>
/deep/.el-tabs__new-tab {
  // width: 100px;
}
</style>
