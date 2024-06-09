<template>
  <div>
    <el-form
      ref="form"
      :rules="rules"
      :model="form"
      label-width="100px"
      label-position="left"
    >
      <el-form-item label="封面" prop="covername">
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

      <el-form-item label="标题" prop="name">
        <el-input
          v-model="form.name"
          placeholder="请输入标题"
          maxlength="50"
          show-word-limit
          @blur="trim(form.name,'name')"
          clearable
        ></el-input>
      </el-form-item>

      <el-form-item label="简介">
        <el-input
          :autosize="{ minRows: 2, maxRows: 4 }"
          type="textarea"
          v-model="form.desc"
          maxlength="500"
          show-word-limit
          placeholder="请简要描述"
        ></el-input>
      </el-form-item>

      <el-form-item label="首播年月">
        <el-date-picker v-model="form.soubdate" type="month" placeholder="选择月">
        </el-date-picker>
      </el-form-item>

      <el-form-item label="种类" prop="type">
        <el-radio-group v-model="form.type">
          <el-radio label="剧集"></el-radio>
          <el-radio label="电影"></el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="视频分类" prop="classify">
        <el-radio-group v-model="form.classify">
          <el-radio label="剧集"></el-radio>
          <el-radio label="电影"></el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="标签">
        <el-tag
          :key="tag"
          v-for="tag in form.dynamicTags"
          closable
          type="success"
          @close="handleClose(tag)"
          effect="plain"
        >
          {{ tag }}
        </el-tag>
        <el-input
          class="input-new-tag"
          v-if="inputVisible"
          v-model="inputValue"
          ref="saveTagInput"
          size="small"
          @keyup.enter.native="handleInputConfirm"
          @blur="handleInputConfirm"
        >
        </el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showInput"
          >+ 新标签</el-button
        >
      </el-form-item>

      <el-form-item label="连播状态" v-show="form.type === '剧集'">
        <el-radio-group v-model="form.status">
          <el-radio label="连播中"></el-radio>
          <el-radio label="已完结"></el-radio>
        </el-radio-group>
      </el-form-item>

      

      <el-form-item class="buttonaa">
        <el-button type="primary" @click="submitForm('ruleForm')"
          >提交</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import UploadCover from "./UploadCover.vue";

export default {
  name: "Formdata",
  data() {
    return {
      form: {
        //封面
        covername: "",
        //标题
        name: "",
        //简介
        desc: "",
        //种类
        type: "",
        //分类
        classify:'',
        //状态
        status: "",
        //标签
        dynamicTags: [],
        //首播日期
        soubdate: "",
        //上传日期
        nowdate:''
      },
      rules: {
        name: [
          {
            required: true,
            message: "请输入标题(两端不能留空哦)",
            trigger: "blur",
          },
        ],
        covername: [{ required: true, message: "请上传分面", trigger: "change" }],
        type:[
          {required: true,message: "这里不能不选", trigger: "change"}
        ],
        classify:[{
          required: true,message: "这里不能不选", trigger: "change"
        }]
      },
      inputValue: "",
      inputVisible: false,
    };
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
      this.covername = data;
    },
    //去除两端空格
    trim(conter,e){
      this.form[e] = conter.trim()
    }
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