<template>
  <div class="login">
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
import { mapMutations,mapState,mapActions } from "vuex";

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
  computed:{
    //拿到用户信息
    ...mapState(['userinfo'])
  }
};
</script>

<style lang="less" scoped>
.login {
  display: flex;
  margin-right: 20px;
  align-items: center;
  span:first-child {
    margin-right: 10px;
  }
}
</style>