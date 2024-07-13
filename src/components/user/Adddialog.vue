<template>
  <div>
    <el-dialog
      title="新增用户"
      :visible="dialogFormVisible"
      @close="close"
    >
      <el-form
        :model="form"
        label-width="80px"
        ref="ruleForm"
        :rules="rules"
        label-position="left"
      >
        <el-form-item label="用户名" prop="username">
          <el-input
            placeholder="请输入用户名"
            v-model="form.username"
          ></el-input>
        </el-form-item>

        <el-form-item label="权限等级" prop="auth">
          <el-select v-model="form.auth" placeholder="请选择">
            <el-option
              v-for="item in authlists"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input
            placeholder="请输入密码"
            show-password
            v-model="form.password"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="repassword">
          <el-input
            placeholder="请再次输入密码"
            show-password
            v-model="form.repassword"
          ></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="updateuser('ruleForm')"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import dialogmixin from "@/components/user/mixin/dialogmixin";

export default {
  name: "Adddialog",
  inject: ["authli"],
  props: ["dialogFormVisible"],
  mixins: [dialogmixin],
  methods: {
    updateuser(formname) {
      this.$refs[formname].validate(async (valid) => {
        if (valid) {
          //进行新增
          try {
            await this.$API.userapi.adduser(this.form)

            this.$message({
              message: "新增用户成功",
              type: "success",
            });
            //关闭
            this.close();
            this.$emit('adduserup')
          } catch (error) {
            console.error(error);
            this.$message({
              message: "新增用户失败",
              type: "error",
            });
          }
        } else {
          return false;
        }
      });
    }
  },
  computed:{
    //inject\provide不是响应式的,通过事件去拿值
    authlists(){
        return this.authli()
    }
  }
};
</script>

<style lang="less" scoped></style>
