<template>
  <div>
    <el-dialog
      :title="title"
      :visible="dialogFormVisible"
      @close="close"
      @open="open"
    >
      <el-form
        :model="form"
        label-width="80px"
        ref="ruleForm"
        :rules="rules"
        label-position="left"
      >
        <el-form-item label="用户id">
          {{ form.uuid }}
        </el-form-item>

        <el-form-item label="用户名">
          {{ form.username }}
        </el-form-item>

        <el-form-item label="权限等级" v-if="uptype === 'authitem'" prop="auth">
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

        <el-form-item label="密码" v-if="uptype === 'passitem'" prop="password">
          <el-input
            placeholder="请输入密码"
            show-password
            v-model="form.password"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="确认密码"
          v-if="uptype === 'passitem'"
          prop="repassword"
        >
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
  props: ["dialogFormVisible", "userinfo", "uptype", "authlists"],
  mixins: [dialogmixin],
  methods: {
    //打开时执行的函数
    open() {
      this.form.username = this.userinfo.username;
      this.form.uuid = this.userinfo.uuid;
      this.form.auth = this.userinfo.auth;
    },
  },
  computed: {
    //标题
    title() {
      switch (this.uptype) {
        case "authitem":
          return "更改用户权限";
        case "passitem":
          return "更改用户密码";
        default:
          return "";
      }
    },
  },
};
</script>

<style lang="less" scoped></style>
