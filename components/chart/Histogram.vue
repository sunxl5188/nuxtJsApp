<template>
  <div v-if="!loading" :id="id" :style="`width: 100%;height: ${height}px;`"></div>
</template>

<script>
  export default {
    name: 'HistogramChart',
    props: {
      height: {
        type: [String, Number],
        default: 400
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
      option: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    data () {
      return {
        id: this.$utils.guid(32),
        loading: true,
        myOpt: {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            },
            valueFormatter: (params) => {
              return params
            }
          },
          color: ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'],
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
            data: ['家具家电', '粮油副食', '生鲜水果', '美容洗护', '母婴用品', '进口食品', '食品饮料', '家庭清洁']
          },
          yAxis: {
            show: true,
            type: 'value'
          },
          series: [
            {
              type: 'bar',
              barMaxWidth: '40%',
              barMinWidth: '10%',
              barMinHeight: 0,
              showBackground: true,
              backgroundStyle: {
                color: 'rgba(198,198,198,0.1)'
              },
              data: [
                {
                  name: '',
                  value: '',
                  itemStyle: {
                    borderRadius: [4, 4, 0, 0]
                  }
                },
                {
                  name: '',
                  value: '',
                  itemStyle: {
                    borderRadius: [4, 4, 0, 0]
                  }
                },
                {
                  name: '',
                  value: '',
                  itemStyle: {
                    borderRadius: [4, 4, 0, 0]
                  }
                },
                {
                  name: '',
                  value: '',
                  itemStyle: {
                    borderRadius: [4, 4, 0, 0]
                  }
                },
                {
                  name: '',
                  value: '',
                  itemStyle: {
                    borderRadius: [4, 4, 0, 0]
                  }
                },
                {
                  name: '',
                  value: '',
                  itemStyle: {
                    borderRadius: [4, 4, 0, 0]
                  }
                },
                {
                  name: '',
                  value: '',
                  itemStyle: {
                    borderRadius: [4, 4, 0, 0]
                  }
                },
                {
                  name: '',
                  value: '',
                  itemStyle: {
                    borderRadius: [4, 4, 0, 0]
                  }
                }
              ]
            }
          ]
        },
        myCharts: null
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
        const { series, legendData } = await this.createData()
        const option = {
          legend: {
            data: legendData
          },
          series
        }
        const opt = Object.assign({}, this.myOpt, option)
        // 初始化图表，设置配置项
        this.myCharts = this.$charts.init(document.getElementById(this.id))
        console.log(opt)
        this.myCharts.setOption(opt, true)
        window.addEventListener('resize', _.debounce(() => {
          this.myCharts.resize()
        }, 100))
      },
      createData () {
        return new Promise((resolve, reject) => {
          const series = []
          const legendData = []
          for (let i = 0; i < this.dataSource.length; i++) {
            this.generateData(this.dataSource[i].value, this.myOpt.series[i].data).then(res => {
              series.push(Object.assign({}, this.myOpt.series[i], {
                name: this.dataSource[i].name,
                data: res,
              }))
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
      generateData (data, dataStyle) {
        return new Promise((resolve) => {
          const arr = []
          data.forEach((item, i) => {
            arr.push(Object.assign({}, dataStyle[i], { value: item }))
          })
          resolve(arr)
        })
      }
    }
  }
</script>

<style scoped>

</style>
