<template>
  <div class="loginbox">
    <el-card class="box-card">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="账号：" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码：" prop="password">
          <el-input type="password" v-model="form.password"></el-input>
        </el-form-item>
        <el-button @click="submitForm('form')">登录</el-button>
      </el-form>
    </el-card>
  </div>
</template>
  
<script>
export default {
  name: "Login",
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      rules: {
        username: [{ required: true, message: "请输入账号" }],
        password: [{ required: true, message: "请输入密码" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          try {
            const res = await this.gettoken(this.form);
            this.$message({
              message: "登录成功",
              type: "success",
            });
            //登录成功的操作
            this.$router.push({ name: "layout" });
          } catch (error) {
            this.$message.error("用户名或者密码错误");
          }
        } else {
          return false;
        }
      });
    },
  },
};
</script>
  
<style lang='less' scoped>
.loginbox {
  display: flex;
  align-items: center;
  width: 100vw;
  height: 100vh;
  min-height: 200px;

  .el-form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .box-card {
    margin: 0 auto;
  }
}
</style>