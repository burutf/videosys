<template>
  <div>
    <el-form
      ref="form"
      :rules="rules"
      :model="form"
      label-width="100px"
      label-position="left"
      :disabled="this.filelist.length === 0"
    >
      <el-form-item label="封面" prop="cover">
        <div class="cover">
          <!-- 这里是封面上传组件 -->
          <UploadCover @covername="elcovername"></UploadCover>
          <!-- 这里比较空，不知道写什么 -->
          <!-- <div class="messages">
            <p>视频格式：mp4</p>
            <p>封面格式：jpg</p>
            <p>awdwa</p>
            <p>awdwa</p>
            <p>awdwa</p>
          </div> -->
        </div>
      </el-form-item>

      <el-form-item label="标题" prop="title">
        <el-input
          v-model="form.title"
          placeholder="请输入标题"
          maxlength="50"
          show-word-limit
          @blur="trim(form.title, 'title')"
          clearable
        ></el-input>
      </el-form-item>

      <el-form-item label="简介" prop="desc">
        <el-input
          :autosize="{ minRows: 2, maxRows: 4 }"
          type="textarea"
          v-model="form.desc"
          maxlength="500"
          show-word-limit
          placeholder="请简要描述"
        ></el-input>
      </el-form-item>

      <el-form-item label="首播年月" prop="soubdate">
        <el-date-picker
          v-model="form.soubdate"
          type="month"
          placeholder="选择年月"
          :picker-options="pickerOptions"
        >
        </el-date-picker>
      </el-form-item>

      <el-form-item label="种类" prop="type">
        <el-radio-group v-model="form.type">
          <el-radio label="剧集"></el-radio>
          <el-radio label="电影"></el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="视频分类" prop="classify">
        <el-select
          size="medium"
          multiple
          :multiple-limit="7"
          v-model="form.classify"
          filterable
          placeholder="请选择1-7个分类"
        >
          <el-option
            v-for="item in classifylist"
            :key="item"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item
        label="连播状态"
        v-show="form.type === '剧集'"
        prop="status"
      >
        <el-radio-group v-model="form.status">
          <el-radio label="连播中"></el-radio>
          <el-radio label="已完结"></el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item class="buttonaa">
        <el-button type="primary" @click="submitForm('form')">提交</el-button>
        <el-button @click="resetForm('form')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import UploadCover from "@/components/upload/UploadCover.vue";

export default {
  name: "Formdata",
  props: ["filelist"],
  data() {
    return {
      form: {
        //封面
        cover: {},
        //标题
        title: "",
        //简介
        desc: "",
        //种类
        type: "",
        //分类
        classify: [],
        //状态
        status: "",
        //标签
        // dynamicTags: [],
        //首播日期
        soubdate: "",
      },
      rules: {
        title: [
          {
            required: true,
            message: "请输入标题(两端不能留空哦)",
            trigger: "blur",
          },
        ],
        desc: [
          {
            required: false,
          },
        ],
        cover: [{ required: true, message: "请上传封面", trigger: "change" }],
        type: [{ required: true, message: "这里选一下", trigger: "change" }],
        soubdate: [{ required: false }],
        classify: [
          {
            required: true,
            message: "最少要选一个",
            trigger: "change",
          },
        ],
        status: [
          {
            required: true,
            message: "这里也要选",
            trigger: "change",
          },
        ],
      },
      //日期选择禁用未来日期
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
      inputValue: "",
      inputVisible: false,
      //视频分类列表
      classifylist: [],
    };
  },
  //
  async mounted() {
    const { code, data } = await this.$API.extraapi.getclassifylist();
    if (code === 200) {
      this.classifylist = data;
    }
  },
  methods: {
    //分类标签删除
    handleClose(tag) {
      this.form.dynamicTags.splice(this.form.dynamicTags.indexOf(tag), 1);
    },
    //分类标签添加
    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.form.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    //这是自定义事件，接收封面组件传来的值
    elcovername(data) {
      this.form.cover = data;
    },
    //去除两端空格
    trim(conter, e) {
      this.form[e] = conter.trim();
    },
    //表单上传
    async submitForm(formName) {
      try {
        await this.$confirm("确定上传吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        });

        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            //触发父元素的loading更改函数,展示加载
            this.$emit('updataloading',true)
            try {
              console.log("进行服务端上传了");
              const fulluploadres = await this.$API.uploadapi.fullupload(
                //上传精简filelist数组
                this.tidyfilelist(),
                //表单
                this.form
              );
              //触发父元素的loading更改函数,结束加载
              this.$emit('updataloading',false)
              this.$message({
                type: "success",
                message: "上传成功!",
              });
              //路由跳转到视频上传状态页面
              this.$router.push({path:'/video-upload/status',query:{videoid:fulluploadres.videoid}})

            } catch (error) {
              //触发父元素的loading更改函数,结束加载
              this.$emit('updataloading',false)
              this.$message({
                type: "error",
                message: "上传失败",
              });
            }

          } else {
            this.$message.error("请检查表单，有问题哦");
            return false;
          }
        });

        
      } catch (error) {
        this.$message({
          type: "info",
          message: "已取消上传",
        });
      }
    },
    //表单重置
    resetForm(formName) {
      this.$confirm("此操作将重置表单, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "已经重置!",
          });
          this.$refs[formName].resetFields();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消重置操作",
          });
        });
    },
    //精简filelist数组
    tidyfilelist() {
      return this.filelist.map((e) => {
        return {
          name: e.name,
          urlname: e.response.name,
          etag: e.response.etag,
          serial: e.serial,
          size: e.size,
          type: e.raw.type,
          status: e.status,
        };
      });
    },
    
  },
  watch: {
    "form.type": function (newq, oldq) {
      if (newq === "电影") {
        this.form.status = "已完结";
      }
    },
  },
  components: {
    UploadCover,
  },
};
</script>

<style lang="less" scoped>
.cover {
  display: flex;
  align-items: center;
  .messages {
    flex: 1;
    color: rgba(138, 138, 138, 0.757);
    margin-left: 10px;
    padding: 10px;
    border-radius: 10px;
    height: 200px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    align-content: center;
    text-align: center;
    p {
      margin: 0;
      line-height: 20px;
    }
  }
}
.el-form {
  background-color: white;
  padding: 17px;
  border-radius: 10px;
  /deep/.el-form-item__label {
    padding-right: 30px;
  }
}

.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}

.buttonaa {
  display: flex;
  flex-direction: row-reverse;
}
</style>