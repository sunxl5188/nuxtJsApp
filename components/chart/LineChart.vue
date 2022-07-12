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
        myChart: null,
        myOpt: {
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            top: '15%',
            containLabel: true
          },
          xAxis: {
            show: true,
            type: 'category',
            boundaryGap: false,
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
          },
          yAxis: {
            show: true,
            type: 'value'
          },
          color: ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'],
          series: [
            {
              smooth: true, // 折线是否光滑，曲线,
              type: 'line',
              stack: 'Total',
              label: {},
              lineStyle: {
                width: 1
              },
              showSymbol: true,
              symbol: 'emptyCircle', // emptyCircle 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'
              emphasis: {
                focus: 'series'
              }
              /* areaStyle: {
                opacity: 0.8,
                color: new this.$charts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: 'rgb(128, 255, 165)'
                  },
                  {
                    offset: 1,
                    color: 'rgb(1, 191, 236)'
                  }
                ])
              } */
            }
          ],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            },
            valueFormatter: (params) => {
              return params
            }
          },
          legend: {
            show: true,
            data: []
          }
        }
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
          } else {
            Object.assign(this.myOpt[key], this.option[key])
          }
        }
      }

      await this.$nextTick()
      this.loading = false
      await this.$nextTick()
      await this.initChart()
    },
    methods: {
      async initChart () {
        const { legendData, series } = await this.createData()
        const option = {
          legend: {
            data: legendData
          },
          series
        }
        const opt = Object.assign({}, option, this.myOpt)
        this.myChart = this.$charts.init(document.getElementById(this.id))
        // console.log(opt)
        this.myChart.setOption(opt, true)
        window.addEventListener('resize', _.debounce(() => {
          this.myChart.resize()
        }, 100))
      },
      createData () {
        return new Promise((resolve, reject) => {
          const series = []
          const legendData = []
          for (let i = 0; i < this.dataSource.length; i++) {
            series.push(Object.assign(this.myOpt.series[i], {
              name: this.dataSource[i].name,
              data: this.dataSource[i].value,
            }))
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
