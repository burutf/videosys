<template>
  <div class="loginbox">
    <el-card class="box-card">
      <div class="loginimg"></div>
      <el-form ref="form" :model="form" :rules="rules" label-width="auto" @keyup.enter.native="submitForm('form')">
        <el-form-item label="账号：" prop="username" >
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码：" prop="password">
          <el-input type="password" v-model="form.password"></el-input>
        </el-form-item>
        <el-button :loading="loading" @click="submitForm('form')">登录</el-button>
      </el-form>
    </el-card>
  </div>
</template>
  
<script>
import { mapActions } from 'vuex';

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
      loading:false,
      url:'src/assets/logo.png'
    };
  },
  methods: {
    ...mapActions(['gettoken','refreshtoken']),
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          this.loading = true
          try {
            const res = await this.gettoken(this.form);
            // await this.refreshtoken()
            this.loading = false
            // this.$message({
            //   message: "登录成功",
            //   type: "success",
            // });
            //登录成功的操作
            this.$router.push({ path:'/' });
          } catch (error) {
            this.loading = false
            if (error.code===400) {
              this.$message.error("用户名或者密码错误");
            }else{
              this.$message.error("服务器繁忙，请稍后再试");
            }
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
  position:absolute;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  height: 100%;
  width: 100%;
  min-width: 300px;
  //css背景图
  background:
    radial-gradient(black 3px, transparent 4px),
    radial-gradient(black 3px, transparent 4px),
    linear-gradient(#fff 4px, transparent 0),
    linear-gradient(45deg, transparent 74px, transparent 75px, #a4a4a4 75px, #a4a4a4 76px, transparent 77px, transparent 109px),
    linear-gradient(-45deg, transparent 75px, transparent 76px, #a4a4a4 76px, #a4a4a4 77px, transparent 78px, transparent 109px),
    #fff;
    background-size: 109px 109px, 109px 109px,100% 6px, 109px 109px, 109px 109px;
    background-position: 54px 55px, 0px 0px, 0px 0px, 0px 0px, 0px 0px;
  .el-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    
  }

  .box-card {
    margin: 0 auto;
    background-color: #ffffffc5;
    box-shadow: 1px 1px 10px 1px rgba(102, 102, 102, 0.627);
    border-radius: 50px 50px 50px 50px;
    .loginimg{
      background-image: url('~@/assets/logo.png');
      width: 50px;
      height: 50px;
      background-size: cover;
      margin: 0px auto 20px;
    }
  }
}
</style>