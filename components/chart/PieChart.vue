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
      dataSource: {
        type: Array,
        default: () => {
          return [
            { value: 1048, name: '搜索引擎' },
            { value: 735, name: '直接的' },
            { value: 580, name: '电子邮件' },
            { value: 484, name: '联合广告' },
            { value: 300, name: '视频广告' }
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
        myOpt: {
          tooltip: {
            show: true,
            trigger: 'item'
          },
          color: ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'],
          legend: {
            show: true,
            orient: 'vertical',
            left: 'left'
          },
          series: [
            {
              name: '',
              type: 'pie',
              radius: ['0%', '50%'],
              center: ['50%', '50%'],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              },
              data: []
            }
          ]
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
      // console.log(this.myOpt)
      Object.assign(this.myOpt.series[0].data, this.dataSource)

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
