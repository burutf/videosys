// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口
import * as echarts from "echarts/core";

// 引入功能组件，组件后缀都为 Component
import { TitleComponent,TooltipComponent, LegendComponent,GridComponent } from "echarts/components";

// 引入各种特性
import { LabelLayout } from "echarts/features";

// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from "echarts/renderers";

/** 引入饼状图图表，图表后缀都为 Chart  */
import { PieChart,BarChart } from "echarts/charts";

//引入主题
import walden from '@/config/echarts/walden'

echarts.registerTheme("walden",walden)

echarts.use([
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  CanvasRenderer,
  LabelLayout,
  PieChart,
  BarChart,
  GridComponent
]);

export default echarts;
