<template>
  <div v-if="!loading" :id="id" :style="`width: 100%;height: ${height}px;`"></div>
</template>

<script>

  export default {
    name: 'LineChart',
    props: {
      height: {
        type: [Number, String],
        default: 400
      },
      grid: {
        type: Object,
        default: () => {
          return {
            left: '3%',
            right: '4%',
            bottom: '3%',
            top: '15%'
          }
        }
      },
      xData: {
        type: Array,
        default: () => {
          return ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        }
      },
      dataSource: {
        type: Array,
        default: () => {
          return [
            { name: '意向', value: [150, 230, 224, 218, 135, 147, 260] },
            { name: '预购', value: [120, 132, 101, 134, 90, 230, 210] },
            { name: '成交', value: [220, 182, 191, 234, 290, 330, 310] }
          ]
        }
      },
      smooth: { // 折线是否光滑，曲线
        type: Boolean,
        default: false
      },
      color: {
        type: Array,
        default: () => {
          return ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc']
        }
      },
      seriesLabel: {
        type: Object,
        default(){
          return {
            show: false
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
      xData: {
        handler () {
          this.refreshData()
        },
        deep: true
      },
      dataSource: {
        handler () {
          this.refreshData()
        },
        deep: true
      }
    },
    async created () {
      const { legendData, series } = await this.createData()
      this.option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          valueFormatter: (params) => {
            return params
          }
        },
        color: this.color,
        grid: {
          left: this.grid.left,
          right: this.grid.right,
          bottom: this.grid.bottom,
          top: this.grid.top,
          containLabel: true
        },
        legend: {
          data: legendData
        },
        xAxis: {
          type: 'category',
          data: this.xData
        },
        yAxis: {
          type: 'value'
        },
        series
      }
    },
    async mounted () {
      await this.$nextTick()
      this.loading = false
      await this.$nextTick()
      this.initChart()
    },
    methods: {
      initChart () {
        this.myChart = this.$charts.init(document.getElementById(this.id))
        this.myChart.setOption(this.option)
        window.addEventListener('resize', _.debounce(() => {
          this.myChart.resize()
        }, 100))
      },
      createData () {
        return new Promise((resolve, reject) => {
          const series = []
          const legendData = []
          for (let i = 0; i < this.dataSource.length; i++) {
            series.push({
              name: this.dataSource[i].name,
              type: 'line',
              stack: 'Total',
              smooth: this.smooth,
              data: this.dataSource[i].value,
              label: this.seriesLabel
            })
            legendData.push(this.dataSource[i].name)
          }
          resolve({ series, legendData })
        })
      },
      async refreshData () {
        const { series } = await this.createData()
        const option = this.myChart.getOption()
        option.series = series
        this.myChart.setOption(option, true)
      }
    }
  }
</script>

<style scoped>

</style>
