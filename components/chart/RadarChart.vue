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
      dataSource: {
        type: Array,
        default: () => {
          return []
        }
      },
      option: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    data () {
      return {
        id: this.$utils.guid(),
        loading: true,
        myOpt: {
          name: '预算与支出',
          color: ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'],
          tooltip: {show:true},
          legend: {
            show: true,
            data: ['已分配预算', '实际支出']
          },
          radar: {
            center: ['50%', '50%'],
            radius: '60%',
            splitNumber: 5,
            indicator: [
              { name: '销售', max: 6500, color: '#ff0000' },
              { name: '管理', max: 16000 },
              { name: '信息技术', max: 30000 },
              { name: '客服', max: 38000 },
              { name: '研发', max: 52000 },
              { name: '市场', max: 25000 }
            ]
          },
          series: [
            {
              name: '预算与支出',
              type: 'radar',
              symbol: 'circle', // 标记的图形
              // areaStyle: { opacity: 0.4 }, // 区域填充样式
              data: [
                {
                  value: [4200, 3000, 20000, 35000, 50000, 18000],
                  name: '已分配预算'
                },
                {
                  value: [5000, 14000, 28000, 26000, 42000, 21000],
                  name: '实际支出'
                }
              ]
            }
          ],
        },
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
    async mounted () {
      for (const key in this.option) {
        if (Object.prototype.hasOwnProperty.call(this.option, key)) {
          if (key === 'series') {
            for (let i = 0; i < this.option[key].length; i++) {
              const obj = this.option[key][i]
              for (const k in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, k)) {
                  if (typeof this.option[key][i][k] === 'object') {
                    if (typeof this.myOpt[key][i][k] === 'undefined') {
                      this.myOpt[key][i][k] = obj[k]
                    } else {
                      Object.assign(this.myOpt[key][i][k], obj[k])
                    }
                  } else {
                    this.myOpt[key][i][k] = obj[k]
                  }
                }
              }
            }
          } else if (Object.prototype.hasOwnProperty.call(this.myOpt, key)) {
            Object.assign(this.myOpt[key], this.option[key])
          } else {
            this.myOpt[key] = this.option[key]
          }
        }
      }

      this.dataSource.forEach((item, i) => {
        Object.assign(this.myOpt.series[0].data[i], item)
      })

      await this.$nextTick()
      this.loading = false
      await this.$nextTick()
      this.initChart()
    },
    methods: {
      initChart () {
        // 初始化图表，设置配置项
        this.myCharts = this.$charts.init(document.getElementById(this.id))
        this.myCharts.setOption(this.myOpt, true)
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
