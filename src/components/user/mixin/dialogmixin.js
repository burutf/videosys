export default {
  data() {
    let repeatValidate = (rule, value, callback) => {
      if (value !== this.form.password) {
        callback("两次输入密码不一致!");
      } else {
        callback();
      }
    };
    return {
      form: {
        auth:'',
        uuid: 0,
        username: "",
        password: "",
        repassword: "",
      },
      rules: {
        auth: [{ required: true, trigger: "change",message: "请为用户分配权限" }],
        password: [
          { required: true, message: "密码必须要填", trigger: "blur" },
          { min: 3, trigger: "blur", message: "至少要大于三位" },
        ],
        repassword: [
          { required: true, message: "请再次输入密码", trigger: "blur" },
          { validator: repeatValidate, trigger: "blur" },
        ],
        username:[
          {required: true, message: "请输入用户名", trigger: "blur"}
        ]
      },
    };
  },
  methods: {
    //关闭后的回调
    close() {
      //关闭时对表单进行重置
      this.$refs.ruleForm.resetFields();
      this.$emit("close");
    },
    //刷新列表
    relist(){
      this.$emit('relist')
    },
    updateuser(formname) {
      this.$refs[formname].validate(async (valid) => {
        if (valid) {
          //进行更改
          try {
            await this.$API.userapi.updateuser(this.form, this.uptype);

            this.$message({
              message: this.title + "成功",
              type: "success",
            });
            //关闭并刷新
            this.close();
            this.relist();
          } catch (error) {
            console.error(error);
            this.$message({
              message: this.title + "失败",
              type: "error",
            });
          }
        } else {
          return false;
        }
      });
    },
  },
};
