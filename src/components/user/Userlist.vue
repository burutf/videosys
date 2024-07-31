<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%"
      @filter-change="filterchange"
      :default-sort="{ prop: 'create_date', order: 'descending' }"
      @sort-change="sorttable"
    >
      <el-table-column
        prop="create_date"
        label="创建日期"
        min-width="100px"
        sortable="custom"
        :sort-orders="['ascending', 'descending']"
      >
      </el-table-column>
      <el-table-column prop="username" label="用户名"> </el-table-column>
      <el-table-column
        prop="auth"
        label="权限等级"
        min-width="90px"
        :filters="tableauthlists"
        :filter-multiple="false"
        column-key="auth"
      >
        <!-- 转换权限等级为可读性好的名称 -->
        <template slot-scope="scope">
          {{ nameauth(scope.row.auth) }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <slot :scope="scope">
            插槽
          </slot>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "Userlist",
  props: [
    "tableData",
    //权限等级
    "tableauthlists",
    //权限列表
    "authlists",
  ],
  data() {
    return {};
  },
  methods: {
    //筛选
    filterchange(data) {
        this.$emit('filterchange',data)
    },
    //排序
    sorttable(data) {
        this.$emit('sorttable',data)
    },
    //将权限等级变成名称
    nameauth(index) {
      const obj = this.authlists.find((item) => {
        return item.value === index;
      });
      return obj.label;
    },
  },
};
</script>

<style lang="less" scoped>
//引入表格样式
@import "@/assets/style/table.css";
</style>
