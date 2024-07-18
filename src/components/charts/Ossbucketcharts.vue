<template>
  <el-card class="ossbucketcharts">
    <div ref="mainchart" style="width: 100%; height: 100%"></div>
  </el-card>
</template>

<script>
import minxin from "@/components/charts/mixin/mixin";
export default {
  name: "Ossbucketcharts",
  mixins: [minxin],
  data() {
    return {
      option: {
        title: {
          text: "OSS存储状态",
          left: "center",
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          bottom: "0%",
          left: "center",
        },
        series: [
          {
            name: "存储大小（MB）",
            type: "pie",
            radius: ["40%", "70%"],
            center: ["50%", "70%"],
            // adjust the start and end angle
            startAngle: 180,
            endAngle: 360,
            data: [],
            label: {
              show: true, // 显示标签
              formatter: "{b}:{d}%", // 标签内容格式
            },
          },
        ],
      },
    };
  },
  mounted() {
    this.getossbucketcharts();
  },
  methods: {
    //获取oss的存储状态
    async getossbucketcharts() {
      try {
        const { data } = await this.$API.echartsapi.getossbucketcharts();
        this.option.series[0].data = data;
        //重新渲染图表
        this.setoption();
      } catch (error) {}
    },
  },
};
</script>

<style lang="less" scoped>
.ossbucketcharts {
  
}
</style>
