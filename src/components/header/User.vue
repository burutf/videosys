<template>
  <div class="user">
    <div class="boxshadow"></div>
    <span>{{ userinfo.username }}</span>
    <el-dropdown @command="handleCommand">
      <el-avatar icon="el-icon-user-solid"></el-avatar>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="Clearlogin">登出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { mapMutations, mapState, mapActions } from "vuex";

export default {
  name: "user",
  data() {
    return {};
  },
  mounted() {
    //仓库没有存着用户信息的话就开始就执行获取用户信息
    if (!this.userinfo.username) {
      this.getuserinfo();
    }
  },
  methods: {
    ...mapMutations(["Clearlogin"]),
    ...mapActions(["getinfo"]),
    //头像的下拉列表触发函数
    handleCommand(e) {
      this[e]();
    },
    //获取用户信息
    async getuserinfo() {
      try {
        await this.getinfo();
      } catch (error) {
        console.error(error);
      }
    },
  },
  computed: {
    //拿到用户信息
    ...mapState(["userinfo"]),
  },
};
</script>

<style lang="less" scoped>


.user {
  max-width: 150px;
  background-color: #fff;
  display: flex;
  align-items: center;
  height: 60px;

  .boxshadow {
    height: 30px;
    width: 10px;
  }
  > span {
    margin-right: 10px;
    line-height: 60px;
    //文字超出以省略号显示
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .el-dropdown {
    width: 40px;
    height: 40px;
  }
}

@media (max-width: 560px) {
  .user {
    box-shadow: -20px 0px 13px -22px rgba(95, 95, 95, 0.664);
  }
}
</style>
