<template>
  <div class="listdiv">
    <el-upload
      class="upload-demo"
      action=""
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
    <ul class="ullist">
      <li v-for="(item, i) in fileList" :key="i">
        <span>{{ item.name }}</span>
        <!-- 显示当前的上传成没成功 -->
        <i v-if="item.status === 'success'" class="el-icon-success status"></i>
        <el-progress :percentage="item.percentage"></el-progress>
        <span class="serial">({{ item.serial }})</span>
        <i @click="delflielist(item)" class="el-icon-close del"></i>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "UploadFile",
  data() {
    return {
      dada: {},
      fileList: [],
      userid: 10001,
      uploadTemUrl: "temporary",
      //对象数组，{uid：00000,uploadId:000021awdaw} 方便后面做
      filefpid: [],
      //校验失败的文件们
      errfile: [],
      //最大上传数量
      limit: 30,
      //给视频一个顺序编号
      serial: 1,
    };
  },
  methods: {
    //成功上传后的处理
    upsuccess(response, file, fileList) {
      console.log(response);
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
      console.log("我开始上传了");
      //等下DOM再执行获取文件列表
      this.$nextTick(async () => {
        const { name } = filec.file;
        const { file } = filec;
        try {
          const uploadreturn = await this.$API.upload(
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
          console.log('文件上传时出错'+error);
        }
      });
    },
    //上传之前做校验(返回false就会不让文件进行上传)
    beforeUpload(file) {
      //找当前文件是不是已经校验不通过了
      const ischckout = this.errfile.some((e) => {
        return e.file.uid === file.uid;
      });
      //确实校验不通过过，就return出去，不必重复执行
      if (ischckout) return false;
      console.log("我进行上传前校验了");
      //拿到文件的类型和大小
      const { type, size } = file;
      const istype = type === "video/mp4";
      const issize = size / 1024 / 1024 < 1024 * 4; //乘号后面单位GB，当前是最大不超过4GB
      if (!istype) {
        this.$message.error("目前只支持MP4格式，请重新上传");
      } else if (!issize) {
        this.$message.error("最大文件不能超过4GB，请重新上传");
      }
      //如果有任何一条规则没有通过就加到校验失败数组中
      if (!istype || !issize) {
        this.errfile.push({
          file,
        });
      }
      return istype && issize;
    },
    //删除文件时也要更新列表
    async beforeremove(file, fileList) {
      console.log("检测到了删除文件");
      //是否删除
      let isdel = true;
      //拿到名字取删除已经上传的OSS文件，拿到uid去获取指定的分片id中断上传
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
          const delfileres = await this.$API.delupload(
            `${this.temlurl}${name}`
          );
          if (delfileres.res.status === 204) {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
          }
        }
      } else if (file.status === "ready") {
        //如果是没有校验通过的文件就直接return出去，不执行下面
        //文件进行校验需要把文件的raw传过去，里面有文件类型
        if (!this.beforeUpload(file.raw)) return;
        console.log("我将要中断分片上传");
        //先find到哪个下标下的对象是保存当前上传的uploadId，获取他
        const obj = this.filefpid.find((e, i) => {
          return e.uid === uid;
        });
        const uploadId = obj.uploadId;
        try {
          //中断分片上传
          const reqzd = await this.$API.abortMultipartUpload(
            `${this.temlurl}${name}`,
            uploadId
          );
          if (reqzd.res.status === 204) {
            this.$message({
              showClose: true,
              message: `已经中断${name}文件上传`,
              type: "warning",
            });
            console.log("中断成功了");
          }
        } catch (error) {
          console.log(error);
        }
      }
      if (!isdel) return;
      //更新列表
      this.fileList.splice(this.fileList.indexOf(file), 1);
      // this.fileList = this.fileList.filter((e) => {
      //   return e.uid !== file.uid;
      // });
      //重新排列编号
      this.serialreload();
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
            const { file, uploadId } = cpt;
            //这里是做数组去重，重复的就不添加了
            const isexist = Boolean(
              this.filefpid.find((item, i) => {
                return item.uid === file.uid;
              })
            );
            if (!isexist) {
              this.filefpid.push({ uid: file.uid, uploadId: uploadId });
            }
            //filelist加进度条
            this.addjindu(cpt.file, p);
          }
        },
        // 设置并发上传的分片数量。
        // parallel: 4,
        // 设置分片大小。默认值为1 MB，最小值为100 KB。
        // partSize: 1024 * 1024,
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
  },
  computed: {
    //拼接
    temlurl() {
      return `${this.uploadTemUrl}/${this.userid}/`;
    },
  },
};
</script>

<style lang="less" scoped>
.listdiv {
  display: flex;
  align-items: flex-start;
  background-color: rgb(238, 238, 239);
  border-radius: 7px;
  padding: 10px;
  min-width: 600px;
}
.upload-demo {
  position: relative;
  border: 1px dashed #d9d9d9;
  cursor: pointer;
  border-radius: 10px;
  overflow: hidden;
  background-color: white;
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
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: auto;
  max-height: 245px;
  li {
    position: relative;
    flex: 1;
    margin: 5px;
    border: 1px rgba(0, 0, 0, 0.099) solid;
    min-width: 150px;
    height: 110px;
    background-color: white;
    border-radius: 10px;
    padding: 10px;

    //文字超出以省略号显示
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    .status {
      position: absolute;
      bottom: 5px;
      right: 5px;
      font-size: 20px;
      color: green;
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
  li:hover .status {
    display: none;
  }
  li:hover .del {
    display: block;
  }
}
</style>