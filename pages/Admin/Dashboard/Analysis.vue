<template>
  <div>
    <a-row :gutter="20">
      <a-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6" :xxl="6">
        <MyCard>
          <div class="d-flex justify-content-between align-items-center">
            <div>总销售额</div>
            <a-tooltip placement="top" title="提示文字">
              <a-icon type="exclamation-circle"/>
            </a-tooltip>
          </div>
          <div class="font-30 line-40 u-m-t-10">
            <countTo :start-val='0' :end-val='85326' prefix="￥"></countTo>
          </div>
          <div class="card-chart">
            <div class="d-flex justify-content-start align-items-center">
              <span>同周比 12%</span>
              <a-icon type="caret-up" class="text-danger mr-2"/>
              <span>日环比 11%</span>
              <a-icon type="caret-down" class="text-success"/>
            </div>
          </div>
          <div class="border-top pt-2">日均销售额 ￥234.56</div>
        </MyCard>
      </a-col>
      <a-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6" :xxl="6">
        <MyCard>
          <div class="d-flex justify-content-between align-items-center">
            <div>访问量</div>
            <a-tooltip placement="top" title="提示文字">
              <a-icon type="exclamation-circle"/>
            </a-tooltip>
          </div>
          <div class="font-30 line-40 u-m-t-10">
            <countTo :start-val='0' :end-val='189345' prefix="￥"></countTo>
          </div>
          <div class="card-chart">
            <LineChart :data-source="lineDataSource" :option="lineOption" height="100"></LineChart>
          </div>
          <div class="border-top pt-2">日均访问量 123,4</div>
        </MyCard>
      </a-col>
      <a-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6" :xxl="6">
        <MyCard>
          <div class="d-flex justify-content-between align-items-center">
            <div>支付笔数</div>
            <a-tooltip placement="top" title="提示文字">
              <a-icon type="exclamation-circle"/>
            </a-tooltip>
          </div>
          <div class="font-30 line-40 u-m-t-10">
            <countTo :start-val='0' :end-val='89835' prefix="￥"></countTo>
          </div>
          <div class="card-chart">
            <HistogramChart height="100"></HistogramChart>
          </div>
          <div class="border-top pt-2">转化率 60%</div>
        </MyCard>
      </a-col>
      <a-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6" :xxl="6">
        <MyCard>
          <div class="d-flex justify-content-between align-items-center">
            <div>运营活动效果</div>
            <a-tooltip placement="top" title="提示文字">
              <a-icon type="exclamation-circle"/>
            </a-tooltip>
          </div>
          <div class="font-30 line-40 u-m-t-10">
            <countTo :start-val='0' :end-val='78' suffix="%"></countTo>
          </div>
          <div class="card-chart">

          </div>
          <div class="border-top pt-2">
            <div class="d-flex justify-content-start align-items-center">
              <span>同周比 12%</span>
              <a-icon type="caret-up" class="text-danger mr-2"/>
              <span>日环比 11%</span>
              <a-icon type="caret-down" class="text-success"/>
            </div>
          </div>
        </MyCard>
      </a-col>
    </a-row>
  </div>
</template>

<script>
  import countTo from 'vue-count-to'
  import MyCard from '~/components/MyCard'
  import LineChart from '~/components/chart/LineChart'
  import HistogramChart from '~/components/chart/Histogram'

  export default {
    name: 'AnalysisComponent',
    components: { HistogramChart, LineChart, MyCard, countTo },
    meta: { title: '分析页' },
    data () {
      return {
        lineDataSource: [{ name: '', value: [150, 23, 224, 2, 135, 10, 260] }],
        lineOption: {
          grid: {
            left: 'auto',
            right: '1%',
            bottom: '1%',
            top: '15%'
          },
          xAxis: {show: false},
          yAxis: {
            show: false,
            axisLine: { show: false },
            axisLabel: { show: false },
            axisTick: { show: false },
            splitLine: { show: false }
          },
          series: [
            {
              lineStyle: {
                width: 0
              },
              showSymbol: false,
              areaStyle: {
                opacity: 0.8,
                color: new this.$charts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: 'rgb(84, 112, 198)'
                  },
                  {
                    offset: 1,
                    color: 'rgb(115, 148, 252)'
                  }
                ])
              }
            }
          ]
        }
      }
    },
  }
</script>

<style scoped lang="scss">
  .card-chart {
    height: 100px;
    display: flex;
    align-items: center;
  }
</style>
