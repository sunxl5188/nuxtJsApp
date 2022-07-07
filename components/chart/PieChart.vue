<template>
  <div v-if="!loading" :id="id" :style="`width:100%;height: ${height}px;`"></div>
</template>

<script>
export default {
  name: 'PieChart',
  props: {
    height: {
      type: [String, Number],
      default: 400
    },
    name: {
      type: String,
      default: 'Access From'
    },
    dataSource: {
      type: Array,
      default: () => {
        return [
          { value: 1048, name: 'Search Engine' },
          { value: 735, name: 'Direct' },
          { value: 580, name: 'Email' },
          { value: 484, name: 'Union Ads' },
          { value: 300, name: 'Video Ads' }
        ]
      }
    },
    radius: {
      type: Array,
      default: () => {
        return ['0%', '50%']
      }
    },
    center: {
      type: Array,
      default: () => {
        return ['50%', '50%']
      }
    },
    color: {
      type: Array,
      default: () => {
        return ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc']
      }
    },
    legend: {
      type: Object,
      default(){
        return {
          show: true,
          orient: 'vertical',
          left: 'left'
        }
      }
    },
    tooltip: {
      type: Object,
      default(){
        return {
          show: true,
          trigger: 'item'
        }
      }
    }
  },
  data () {
    return {
      id: this.$utils.guid(),
      loading: true,
      option: {},
      myChart: null
    }
  },
  watch: {
    dataSource: {
      handler () {
        this.refreshData()
      },
      deep: true
    }
  },
  created () {
    this.option = {
      tooltip: this.tooltip,
      legend: this.legend,
      color: this.color,
      series: [
        {
          name: this.name,
          type: 'pie',
          radius: this.radius,
          center: this.center,
          data: this.dataSource,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    }
  },
  async mounted () {
    await this.$nextTick()
    this.loading = false
    await this.$nextTick()
    this.initChart()
  },
  methods:{
    initChart () {
      // 初始化图表，设置配置项
      this.myCharts = this.$charts.init(document.getElementById(this.id))
      this.myCharts.setOption(this.option, true)
      window.addEventListener('resize', _.debounce(() => {
        this.myCharts.resize()
      }, 100))
    },
    refreshData () {
      // 更新数据
      const option = this.myCharts.getOption()
      option.series[0].data = this.dataSource
      this.myCharts.setOption(option, true)
    }
  }
}
</script>

<style scoped>

</style>
