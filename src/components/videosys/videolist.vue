<template>
  <div>
    
    <el-table
      ref="filterTable"
      :data="tableData"
      style="width: 100%"
      :default-sort="{ prop: 'lastupdate', order: 'descending' }"
      @sort-change="sorttable"
      highlight-selection-row
      @selection-change="handleSelectionChange"
      @filter-change="filterchange"
    >
      <el-table-column type="selection"> </el-table-column>
      <el-table-column
        prop="lastupdate"
        label="更新日期"
        min-width="100px"
        sortable="custom"
        :sort-orders="['ascending', 'descending']"
      >
      </el-table-column>
      <el-table-column prop="title" label="标题"> </el-table-column>
      <el-table-column prop="type" label="类型"> </el-table-column>
      <el-table-column
        prop="status"
        label="状态"
        :filters="statusfilters"
        :filter-multiple="false"
        column-key="status"
      >
      </el-table-column>
      <el-table-column label="标签">
        <template slot-scope="scope">
          <template v-for="(item, i) in scope.row.classify">
            <el-tag size="mini" :key="i" disable-transitions>{{ item }}</el-tag>
          </template>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template v-slot="scope">
          <!-- 这里可以使用插槽来替换 -->
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
  name: "Videolist",
  props:[
    //视频列表
    'tableData',

  ],
  data() {
    return {
      //状态的筛选
      statusfilters: [
        { text: "连播中", value: "连播中" },
        { text: "已完结", value: "已完结" },
      ],
      
    };
  },
  methods: {
    //排序
    sorttable(data) {
      this.$emit('sorttable',data)
    },
    
    //拿到批量选择的数组
    handleSelectionChange(data) {
      this.$emit('handleSelectionChange',data)
    },

    //筛选
    filterchange(data) {
      this.$emit('filterchange',data)
    },
  },
  
  
};
</script>

<style lang="less" scoped>
//引入表格样式
@import "@/assets/style/table.css";

.cell {
  .el-tag {
    margin: 10px 10px 0 0;
  }
}
.el-table::before{
    z-index: auto;
  }
/deep/.el-table__empty-block {
  min-height: 400px;
}
</style>
