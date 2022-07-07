<template>
  <div v-if="!loading" :id="id" :style="`width: 100%;height: ${height}px;`"></div>
</template>

<script>
  export default {
    name: 'ChartHistogram',
    props: {
      height: {
        type: [String, Number],
        default: 400
      },
      borderRadius: {
        type: [Array, String],
        default: () => {
          return [4, 4, 0, 0]
        }
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
          return ['家具家电', '粮油副食', '生鲜水果', '美容洗护', '母婴用品', '进口食品', '食品饮料', '家庭清洁']
        }
      },
      dataSource: {
        type: Array,
        default: () => {
          return [
            { name: '售出额', value: [34000, 25000, 11000, 9000, 7000, 6000, 4800, 7500] },
            { name: '总利润', value: [32000, 21000, 9000, 9800, 17000, 13000, 14800, 17500] }
          ]
        }
      },
      color: {
        type: Array,
        default: () => {
          return ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc']
        }
      }
    },
    data () {
      return {
        id: this.$utils.guid(32),
        loading: true,
        option: {},
        myCharts: null
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
      const { series, legendData } = await this.createData()
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
        // 初始化图表，设置配置项
        this.myCharts = this.$charts.init(document.getElementById(this.id))
        this.myCharts.setOption(this.option, true)
        this.myCharts.resize()
        window.addEventListener('resize', _.debounce(() => {
          this.myCharts.resize()
        }, 100))
      },
      createData () {
        return new Promise((resolve, reject) => {
          const series = []
          const legendData = []
          for (let i = 0; i < this.dataSource.length; i++) {
            series.push({
              name: this.dataSource[i].name,
              data: this.generateData(this.dataSource[i].value),
              type: 'bar',
              barMaxWidth: '40%',
              barMinWidth: '10%',
              barMinHeight: 0,
              showBackground: true,
              backgroundStyle: {
                color: 'rgba(198,198,198,0.1)'
              }
            })
            legendData.push(this.dataSource[i].name)
          }
          resolve({ series, legendData })
        })
      },
      async refreshData () {
        const { series } = await this.createData()
        // 更新数据
        const option = this.myCharts.getOption()
        option.series = series
        this.myCharts.setOption(option, true)
      },
      generateData (data) {
        const arr = []
        data.forEach(item => {
          arr.push({
            value: item,
            itemStyle: {
              borderRadius: this.borderRadius
            }
          })
        })
        return arr
      }
    }
  }
</script>

<style scoped>

</style>
