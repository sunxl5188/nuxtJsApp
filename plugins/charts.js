import * as echarts from 'echarts/core'
import { BarChart, LineChart, PieChart, RadarChart } from 'echarts/charts'
import { TooltipComponent, GridComponent, LegendComponent } from 'echarts/components'
import { LabelLayout, UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'

// 注册必须的组件
echarts.use([BarChart, LineChart, PieChart, RadarChart])
echarts.use([TooltipComponent, GridComponent, LegendComponent, LabelLayout, UniversalTransition, CanvasRenderer])

export default ({ app }, inject) => {
  inject('charts', echarts)
}
