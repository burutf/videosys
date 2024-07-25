<template>
  <el-card class="videostatistics">
    <div ref="mainchart" style="width: 100%; height: 100%"></div>
  </el-card>
</template>

<script>
import minxin from "@/components/charts/mixin/mixin";

export default {
  name: "Videostatistics",
  mixins: [minxin],
  data() {
    return {
      option: {
        title: {
          text: "视频状态",
          left: "center",
        },
        tooltip: {
          trigger: "item",
        },
        xAxis: {
          type: "category",
          data: ["总条数", "今日新增", "今日更新"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [
              //服务器获取
            ],
            type: "bar",
            label: {
              show: true,
            },
          },
        ],
        grid: {
          bottom: "0%", // 图表距离容器下方的距离
          containLabel: true, // 确保标签显示在图表内
        },
      },
    };
  },
  mounted() {
    this.getvideostatus();
  },
  methods: {
    async getvideostatus() {
      try {
        const { data } = await this.$API.echartsapi.getvideostatus();
        this.option.series[0].data = data;
        //重新渲染图表
        this.setoption();
      } catch (error) {}
    },
  },
};
</script>

<style lang="less" scoped>
.videostatistics {
  // height: 200px;
  // min-width: 300px;
}
</style>
