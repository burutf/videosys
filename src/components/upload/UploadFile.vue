<template>
  <div style="margin-bottom: 10px;">
    <div class="listdiv">
      <el-upload
        class="upload-demo"
        action=""
        accept=".mp4"
        ref="upload"
        multiple
        :limit="limit"
        :file-list="fileList"
        :http-request="handleUploadFile"
        :before-upload="beforeUpload"
        :before-remove="beforeremove"
        :on-change="onchange"
        :show-file-list="false"
        :on-exceed="handleExceed"
        :on-success="upsuccess"
      >
        <i class="el-icon-plus avatar-uploader-icon"></i>
        <span class="djsc">点击上传</span>
      </el-upload>

      <!-- 文件列表 -->
      <draggable
        v-model="fileList"
        @change="onEnd"
        animation="200"
        class="draggable"
        easing="cubic-bezier(1, 0, 0, 1)"
        :delay="300"
        dragClass="sortable-drag"
        ghostClass="sortable-drag"
        chosenClass="sortable-drag"
      >
        <transition-group class="ullist" tag="ul">
          <li v-for="(item, i) in fileList" :key="i">
            <span :class="{ errclass: item.status === 'fail' }">{{
              item.name
            }}</span>
            <!-- 显示当前的上传成没成功 -->
            <i
              v-if="item.status === 'success'"
              class="el-icon-success success"
            ></i>
            <i v-if="item.status === 'fail'" class="el-icon-error error"></i>
            <el-progress
              v-if="!item.isbeforup && item.status !== 'fail'"
              :percentage="item.percentage"
            ></el-progress>

            <span class="serial" v-show="item.serial"
              >第{{ item.serial }}回</span
            >
            <i @click="delflielist(item)" class="el-icon-close del"></i>
          </li>
        </transition-group>
      </draggable>
    </div>
    <!-- 功能按钮 -->
    <el-button
      v-show="fileList.length > 0"
      @click="sortindex(false)"
      class="sortbutton"
      >升序排序</el-button
    >
    <el-button
      v-show="fileList.length > 0"
      @click="sortindex(true)"
      class="sortbutton"
      >降序排序</el-button
    >
  </div>
</template>

<script>
//引入节流函数
import debounce from "lodash/debounce";
//引入拖拽排序
import draggable from "vuedraggable";
//引入仓库中的userinfo
import { mapState } from "vuex";
//随机生成id
import { nanoid } from "nanoid";

export default {
  name: "UploadFile",
  props: {
    videoid: {
      type: String,
    },
    proplist: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      dada: {},
      fileList: [],
      uploadTemUrl: "temporary",
      //对象数组，{uid：00000,uploadId:000021awdaw} 方便后面做分片的删除操作
      filefpid: [],
      //校验失败的文件们
      // errfile: [],
      //最大上传数量
      limit: 30,
      //给视频一个顺序编号
      serial: 1,
      //之前已经成功上传的文件列表，通过这个列表来进行删除（不直接删除了，等用户做完所有操作后再删除）
      delvideolist: [],
      //随机一个id，用来当做这组文件的上传目录
      rannanoid: "",
    };
  },
  mounted() {
    this.fileList = this.chuliproplist;
    this.rannanoid = "TP" + nanoid(10);
    //将生成的上传目录id传递出去，同步一下
    this.$emit("rannanoid", this.rannanoid);
  },
  methods: {
    //成功上传后的处理
    upsuccess(response, file, fileList) {
      //分片上传完成从分片上传数组中删除
      this.removefilefpid(file.uid);
      this.fileList.forEach((e, i) => {
        if (e.uid === file.uid) {
          //借口返回数据后，代表完全成功，进度置为100%
          e.percentage = 100;
          //添加视频编号
          this.$set(this.fileList[i], "serial", this.serial++);
          //重新排列编号
          this.serialreload();
        }
      });
    },
    //自定义上传
    handleUploadFile(filec) {
      //等下DOM再执行获取文件列表
      this.$nextTick(async () => {
        const { name } = filec.file;
        const { file } = filec;
        try {
          const uploadreturn = await this.$API.uploadapi.upload(
            `${this.temlurl}${name}`,
            file,
            this.fhopiton()
          );
          //上传成功后的操作
          if (uploadreturn.res.status === 200) {
            //执行这个函数可以给文件列表后面打钩
            filec.onSuccess(uploadreturn);
          }
        } catch (error) {
          //文件传输错误
          this.$message.error("文件上传时出错或已被中止");

          //将错误上传的文件标记为错误文件
          this.errorfile(name);
        }
      });
    },
    //错误文件标记
    errorfile(name) {
      this.fileList.forEach((e) => {
        if (e.name === name) {
          e.status = "fail";
        }
      });
    },
    //表单组件通过父组件传来的服务器校验失败的文件
    //还没做先放一放

    // 防抖函数:重复名字文件名不上传
    handlerepeat: debounce(function () {
      this.$message({
        message: "重复名字的文件不能上传",
        type: "warning",
      });
    }, 0),
    //上传之前做校验(返回false就会不让文件进行上传)
    beforeUpload(file) {
      //重复名字文件名不上传
      if (this.repeatname(file)) {
        this.handlerepeat();
        return false;
      }

      //拿到文件的类型和大小
      const { type, size } = file;
      const istype = type === "video/mp4";
      const issize = size / 1024 / 1024 < 1024 * 1; //乘号后面单位GB，当前是最大不超过1GB
      if (!istype) {
        this.$message.error("目前只支持MP4格式，请重新上传");
      } else if (!issize) {
        this.$message.error("最大文件不能超过4GB，请重新上传");
      }

      return istype && issize;
    },
    //重复名字文件不上传
    repeatname(file) {
      return this.fileList.some((e) => {
        return file.name === e.name;
      });
    },
    //删除文件时也要更新列表
    async beforeremove(file, fileList) {
      //是否删除
      let isdel = true;
      //拿到名字去删除已经上传的OSS文件，拿到uid去获取指定的分片id中断上传
      const { name, uid } = file;
      //判断当前的文件状态，如果是成功就去删除，还在上传就中断
      if (file.status === "success") {
        //进行消息提示是否删除
        await this.$confirm("此文件已上传成功，确定删除吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            isdel = true;
          })
          .catch(() => {
            isdel = false;
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          });

        //删除OSS里的文件
        if (isdel) {
          try {
            //判断是不是之前已经上传的文件
            if (file.isbeforup) {
              //如果是之前已经上传的文件，就push到删除数组中
              this.delvideolist.push(file.response.name);
            } else {
              const delfileres = await this.$API.osssys.delupload(
                `${this.temlurl}${name}`
              );
            }

            this.$message({
              type: "success",
              message: "删除成功!",
            });
            //更新列表
            this.fileList.splice(this.fileList.indexOf(file), 1);
            //重新排列编号
            this.serialreload();
          } catch (error) {
            this.$message({
              showClose: true,
              message: `删除${name}文件失败`,
              type: "error",
            });
            //有错误就先停止删除
            return;
          }
        }
      } else if (file.status === "ready") {
        //如果文件的进度为0,一般是文件上传开始时出错，直接return就好，不需要做处理
        if (file.percentage === 0) return;

        try {
          //先find到哪个下标下的对象是保存当前上传的uploadId，获取他
          const obj = this.filefpid.find((e, i) => {
            return e.uid === uid;
          });
          const { uploadId, name: objname } = obj;

          //中断分片上传
          await this.$API.osssys.abortMultipartUpload(objname, uploadId);
          this.$message({
            showClose: true,
            message: `已经中断${name}文件上传`,
            type: "warning",
          });
          //更新列表
          this.fileList.splice(this.fileList.indexOf(file), 1);
          //重新排列编号
          this.serialreload();
        } catch (error) {
          console.error(error);
          this.$message.error("中断文件上传失败");
        }
      } else {
        //这里处理被打上错误标签的项
        //更新列表
        this.fileList.splice(this.fileList.indexOf(file), 1);
        //重新排列编号
        this.serialreload();
      }
    },
    //文件列表发生更改时，更新fileList数组
    onchange(file, fileList) {
      this.$nextTick(() => {
        this.fileList = fileList;
      });
    },
    //删除文件
    delflielist(file) {
      this.beforeremove(file, this.fileList);
    },
    //超过最大数量限制的钩子
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 ${this.limit} 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    //重新排列编号
    serialreload() {
      this.fileList.forEach((e, i) => {
        if (i !== 0) {
          if (e.serial - 1 !== this.fileList[i - 1].serial) {
            e.serial = this.fileList[i - 1].serial + 1;
          }
        } else {
          this.fileList[0].serial = 1;
        }
      });
    },
    //分片上时的配置项
    fhopiton() {
      const options = {
        // 获取分片上传进度、断点和返回值。
        progress: (p, cpt, res) => {
          //最后一个分片不执行
          if (p !== 1) {
            //下面这一段是，获取文件id和分片初始化时的id，再添加到一个数据里面，方便后面中断操作，数组有做去重处理
            const { file, uploadId, name } = cpt;
            //这里是做数组去重，重复的就不添加了
            const isexist = Boolean(
              this.filefpid.find((item, i) => {
                return item.uid === file.uid;
              })
            );
            if (!isexist) {
              this.filefpid.push({ uid: file.uid, uploadId, name });
            }
            //filelist加进度条
            this.addjindu(cpt.file, p);
          }
        },
        // 设置并发上传的分片数量。
        // parallel: 5,
        // 设置分片大小。默认值为1 MB，最小值为100 KB。
        // partSize: 1024 * 1024 * 1,
      };
      return options;
    },
    //给filelist加进度条
    addjindu(file, p) {
      this.fileList.forEach((e, i) => {
        if (e.uid === file.uid) {
          //进度条的具体实现
          e.percentage = Math.floor(p * 100);
        }
      });
    },
    //给父组件把filelist数组传过去
    //还有之前上传但是这次更改要删除的数组
    deliveryfl() {
      this.$emit("filelistcd", this.fileList, this.delvideolist);
    },
    //拖拽排序后进行的操作
    onEnd() {
      this.serialreload();
    },
    //根据名称编号重新排序(默认为升序，true为降序)
    sortindex(isis) {
      this.fileList.sort((a, b) => {
        a = parseInt(a.name);
        b = parseInt(b.name);
        if (isis) {
          //降序
          return b - a;
        } else {
          //升序
          return a - b;
        }
      });
    },
    //取消所有进行中的分片上传
    async closeupload() {
      try {
        //中断分片上传
        this.filefpid.map(async (e) => {
          try {
            await this.$API.osssys.abortMultipartUpload(e.name, e.uploadId);
          } catch (error) {}
        });
      } catch (error) {}
    },
    //分片上传完成从分片上传数组中删除
    removefilefpid(uid) {
      const index = this.filefpid.findIndex((e) => e.uid == uid);
      this.filefpid.splice(index, 1);
    },
  },
  computed: {
    ...mapState(["userinfo"]),
    //拼接
    temlurl() {
      return `${this.uploadTemUrl}/${this.userid}/${this.rannanoid}/`;
    },
    //处理传来的proplist
    chuliproplist() {
      //如果没有传来proplist就返回空数组
      if (this.proplist.length === 0) return [];
      const arr = this.proplist.map((e) => {
        const name = e.name;
        return {
          name,
          percentage: 100,
          serial: e.serial,
          status: e.status,
          //传来的视频列表是已经上传了的，做个标记
          isbeforup: true,
          size: e.size,
          type: e.type,
          response: {
            name: e.urlname,
          },
          uploaddate: e.uploaddate,
        };
      });
      return arr;
    },
    //拿到uuid
    userid() {
      return this.$store.state.userinfo.uuid;
    },
  },
  beforeDestroy() {
    //取消所有进行中的分片上传
    this.closeupload();
  },
  watch: {
    fileList: function (newdata, olddata) {
      //给父组件传值
      this.deliveryfl();
    },
    //检测到传过来的列表更改时，自动更新这里的列表
    proplist: function (newdata, olddata) {
      this.fileList = this.chuliproplist;
      //并且清空delvideolist
      this.delvideolist = [];
    },
  },
  components: {
    //拖拽排序组件
    draggable,
  },
};
</script>

<style lang="less" scoped>
//设置拖动元素的class的占位符的类名。
//拖动元素的class
// 设置被选中的元素的class
.sortable-drag {
  border: solid 2px #3089dc !important;
}

.listdiv {
  display: flex;
  background-color: rgb(238, 238, 239);
  border-radius: 7px;
  padding: 10px;
  .draggable{
    flex: 1;
  }
}
.upload-demo {
  position: relative;
  border: 1px dashed #d9d9d9;
  cursor: pointer;
  border-radius: 10px;
  background-color: white;
  margin-right: 10px;
  align-self: flex-start;
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    text-align: center;
    height: 120px;
    line-height: 100px;
  }
  .djsc {
    color: #8c939d;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 30px;
    //禁止换行
    white-space: nowrap;
  }
}
.upload-demo:hover {
  border-color: #4afbc9;
  background-color: #40ff9624;
}

//这是文件列表的样式
.ullist {
  margin: 0;
  padding: 0;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  overflow: auto;
  // margin-bottom: 10px;
  li {
    position: relative;
    border: 1px rgba(0, 0, 0, 0.099) solid;
    width: 150px;
    height: 110px;
    flex-grow: 1;
    background-color: white;
    border-radius: 10px;
    padding: 10px;
    user-select: none;
    //文字超出以省略号显示
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    cursor:grab;
    margin: 0 10px 10px 0;
    .success {
      position: absolute;
      bottom: 5px;
      right: 5px;
      font-size: 20px;
      color: green;
    }
    .errclass {
      color: red;
    }
    .error {
      position: absolute;
      bottom: 5px;
      right: 5px;
      font-size: 20px;
      color: red;
    }
    .del {
      display: none;
      position: absolute;
      bottom: 5px;
      right: 5px;
      font-size: 20px;
      cursor: pointer;
    }
    .serial {
      position: absolute;
      bottom: 8px;
      left: 8px;
      font-size: 15px;
      color: green;
    }
  }
  //显示隐藏效果
  li:hover .success {
    display: none;
  }
  li:hover .error {
    display: none;
  }
  li:hover .del {
    display: block;
  }
}
.sortbutton {
  margin-top: 10px;
}

@media (max-width: 560px) {
  //当窗口过小时，视频上传列表的处理
  .listdiv {
    flex-direction: column-reverse;
  }
}
</style>
