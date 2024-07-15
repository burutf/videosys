

export default {
  data() {
    return {
      //初始化后的echarts对象
      echartsinit:{},
    }
  },
  mounted() {
    this.initcharts()
  },
  methods: {
    //初始化化echarts
    initcharts() {
      this.echartsinit = this.$echarts.init(this.$refs.mainchart,'walden');
      this.setoption()
    },
    //渲染图表
    setoption() {
      this.echartsinit.setOption(this.option);
    },
    //重新设置大小
    resize() {
      this.echartsinit.resize();
    },
  },
};
