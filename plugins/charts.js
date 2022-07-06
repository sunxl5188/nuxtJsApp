import * as echarts from 'echarts/core'
import { BarChart } from 'echarts/charts'
import { TooltipComponent, GridComponent, LegendComponent } from 'echarts/components'
import { LabelLayout, UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'

// 注册必须的组件
echarts.use([TooltipComponent, GridComponent, LegendComponent, BarChart, LabelLayout, UniversalTransition, CanvasRenderer])

export default ({ app }, inject) => {
  inject('charts', echarts)
}
