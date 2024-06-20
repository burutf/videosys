<template>
  <div class="login">
    <span>{{ username }}</span>
    <el-dropdown @command="handleCommand">
      <el-avatar icon="el-icon-user-solid"></el-avatar>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="Clearlogin">登出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  name: "user",
  data() {
    return {
      username: "user",
    };
  },
  mounted() {
    //开始就执行获取用户信息
    this.userinfo();
  },
  methods: {
    ...mapMutations(['Clearlogin']),
    async userinfo() {
      try {
        const info = await this.$API.extraapi.getuserinfo();
        this.username = info.username;
      } catch (error) {
        console.error(error);
      }
    },
    //头像的下拉列表触发函数
    handleCommand(e){
      this[e]();
    }
  },
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