<template>
  <div>
    <div>
      <h3>历史记录</h3>
      <span class="message">(找回已删除的轮播图)</span>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%"
      empty-text="当前没有历史记录"
      v-loading="loading"
    >
      <el-table-column prop="date" label="操作日期"> </el-table-column>
      <el-table-column prop="aggarr.title" label="标题"></el-table-column>
      <el-table-column prop="isstart" label="状态">
        <template v-slot="{ row }">
          <div
            class="status"
            :class="{ statustrue: row.isstart, statusfalse: !row.isstart }"
          ></div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template v-slot="{ row }">
          <el-button
            @click="handleDelete(row)"
            slot="reference"
            type="text"
            class="buttonleft"
            >还原</el-button
          >

          <el-popconfirm
            title="将不可找回，确定删除吗？"
            confirm-button-type="danger"
            @confirm="handleEdit(row)"
          >
            <el-button slot="reference" type="text" style="color: red"
              >彻底删除</el-button
            >
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "History",
  props: ["tableData", "loading"],
  methods: {
    //删除
    handleEdit(row) {
      this.$emit('delslideshowlist',row.videoid)
    },
    // 还原
    handleDelete(row) {
        this.$emit('restore',row.videoid)
    },
  },
};
</script>

<style lang="less" scoped>
//引入表格样式
@import "@/assets/style/table.css";

.buttonleft {
  margin-right: 7px;
  padding: 0;
}

.status {
  width: 18px;
  height: 18px;
  border-radius: 100%;
  box-shadow: 1px 1px 3px rgba(188, 188, 188, 0.418);
  border: 1px solid rgba(227, 227, 227, 0.836);
}
.statustrue {
  background-color: rgb(29, 219, 45);
}
.statusfalse {
  background-color: rgb(255, 149, 149);
}

h3{
  font-size: 1.3em;
  font-weight: 500;
  color: rgb(39, 39, 39);
  margin-bottom: 7px;
  display: inline;
  margin-right: 5px;
}
.message{
    font-size: 0.8em;
    color: rgb(170, 170, 170);
  }
</style>
