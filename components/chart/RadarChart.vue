<template>
  <div v-if="!loading" :id="id" :style="`width:100%;height: ${height}px;`"></div>
</template>

<script>
  export default {
    name: 'RadarChart',
    props: {
      height: {
        type: [String, Number],
        default: 400
      },
      name: {
        type: String,
        default: '预算与支出'
      },
      color: {
        type: Array,
        default () {
          return ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc']
        }
      },
      dataSource: {
        type: Array,
        default: () => {
          return [
            {
              value: [42, 90, 88, 65, 50, 100],
              name: '已分配预算'
            },
            {
              value: [32, 88, 80, 60, 40, 80],
              name: '实际支出'
            }
          ]
        }
      },
      legend: {
        type: Object,
        default () {
          return {}
        }
      },
      radar: {
        type: Object,
        default () {
          return {}
        }
      },
      series: {
        type: Object,
        default () {
          return {}
        }
      },
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
      const legendData = []
      this.dataSource.forEach(item => {
        legendData.push(item.name)
      })
      // radar ****************************************
      const radar = Object.assign({
        center: ['50%', '50%'],
        radius: '60%',
        splitNumber: 5,
        indicator: [
          { name: '销售', max: 100 },
          { name: '管理', max: 100 },
          { name: '信息技术', max: 100 },
          { name: '客服', max: 100 },
          { name: '研发', max: 100 },
          { name: '市场', max: 100 }
        ]
      }, this.radar)

      // \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
      const series = Object.assign({
        name: this.name,
        type: 'radar',
        symbol: 'circle', // 标记的图形
        areaStyle: { opacity: 0.4 }, // 区域填充样式
        data: this.dataSource
      }, this.series)

      // option*****************************************
      this.option = {
        legend: Object.assign(
          {
            show: false,
            data: legendData
          },
          this.legend
        ),
        color: this.color,
        radar,
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
