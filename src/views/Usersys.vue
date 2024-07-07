<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="createddate" label="创建日期"> </el-table-column>
      <el-table-column prop="username" label="用户名"> </el-table-column>
      <el-table-column prop="privilege" label="权限级别"> </el-table-column>
      <el-table-column prop="address" label="操作"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "Usersys",
  data() {
    return { tableData: [] };
  },
};
</script>

<style lang="less" scoped></style>
