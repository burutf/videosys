<template>
  <el-card>
    <div ref="mainchart" style="width: 100%; height: 100%"></div>
  </el-card>
</template>

<script>
import minxin from "@/components/charts/mixin/mixin";

export default {
  name: "Usersstatistics",
  mixins: [minxin],
  data() {
    return {
      option: {
        title: {
          text: "用户权限分布",
          left: "center",
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          left: "right",
        },
        series: [
          {
            name: "权限级别",
            type: "pie",
            radius: "50%",
            center: ["50%", "60%"],
            data: [],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
            label: {
              show: true, // 显示标签
              formatter: "{b}: {c} ({d}%)", // 标签内容格式
            },
          },
        ],
      },
    };
  },
  mounted() {
    this.getuserauthsum();
  },
  methods: {
    async getuserauthsum() {
      try {
        const { data } = await this.$API.echartsapi.getuserauthsum();
        this.option.series[0].data = data;
        //重新渲染图表
        this.setoption();
      } catch (error) {}
    },
  },
};
</script>

<style lang="less" scoped></style>
