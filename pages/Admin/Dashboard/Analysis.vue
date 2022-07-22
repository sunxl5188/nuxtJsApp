<template>
  <div v-load="loading">
    <div v-if="!loading">
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
              <ChartLineChart :data-source="lineDataSource" :option="lineOption" height="90"></ChartLineChart>
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
              <ChartHistogram :data-source="histDataSource" :option="histOption" height="90"></ChartHistogram>
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
              <a-progress
                :percent="70"
                type="line"
                :show-info="false"
                status="active"
                :stroke-width="10"
                :stroke-color="{
                  '0%': '#108ee9',
                  '100%': '#87d068'
                }"
              />
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

      <MyTabs :tabs-list="tabsList">
        <div slot="tabBarExtra">
          <div>
            <a-button type="link" size="small">今日</a-button>
            <a-button type="link" size="small">本周</a-button>
            <a-button type="link" size="small">本月</a-button>
            <a-button type="link" size="small">本年</a-button>
            <a-range-picker :style="{width: '256px'}"></a-range-picker>
          </div>
        </div>
        <div slot="tabs1">
          <a-row :gutter="20">
            <a-col :xs="24" :sm="24" :md="18" :lg="18" :xl="18" :xxl="18">
              <div style="height:340px;">
                <ChartHistogram :height="340" :option="tabsOpt"></ChartHistogram>
              </div>
            </a-col>
            <a-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6" :xxl="6">
              <div style="height:340px;">
                <RankList title="门店销售额排行榜" :list="rankList"></RankList>
              </div>
            </a-col>
          </a-row>
        </div>
        <div slot="tabs2">
          <a-row :gutter="20">
            <a-col :xs="24" :sm="24" :md="18" :lg="18" :xl="18" :xxl="18">
              <div style="height:340px;">
                <ChartHistogram :height="340" :option="tabsOpt"></ChartHistogram>
              </div>
            </a-col>
            <a-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6" :xxl="6">
              <div style="height:340px;">
                <RankList title="线上销售额排行榜" :list="lineList"></RankList>
              </div>
            </a-col>
          </a-row>
        </div>
      </MyTabs>

      <!--\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\-->
      <a-row :gutter="20">
        <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" :xxl="12">
          <MyCard title="热门搜索">
            <a-row :gutter="[20,20]">
              <a-col :span="12">
                <div>
                  <div class="text-black-50">搜索用户数</div>
                  <div>
                    <span class="font-24">
                      <count-to :start-val="8000" :end-val="8956" suffix="次"></count-to>
                    </span>
                    <span class="ml-3">同周比 12%</span>
                    <a-icon type="caret-up" class="text-danger"/>
                  </div>
                </div>
                <div style="height:60px;">
                  <ChartLineChart :data-source="lineDataSource" :option="lineOption" height="60"></ChartLineChart>
                </div>
              </a-col>
              <a-col :span="12">
                <div>
                  <div class="text-black-50">人均搜索次数</div>
                  <div>
                    <span class="font-24">
                      <count-to :start-val="0" :end-val="5" suffix="次"></count-to>
                    </span>
                    <span class="ml-3">同周比 1.5%</span>
                    <a-icon type="caret-up" class="text-danger"/>
                  </div>
                </div>
                <div style="height:60px;">
                  <ChartLineChart :data-source="lineDataSource" :option="lineOption3" height="60"></ChartLineChart>
                </div>
              </a-col>
            </a-row>
            <MyTable
              :data-source="searchData"
              :columns="columns"
              :pagination="pagination"
              size="small"
            >
              <template #rang="{row}">
                {{row}} %
                <a-icon type="caret-up" class="text-danger"/>
              </template>
            </MyTable>
          </MyCard>
        </a-col>
        <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" :xxl="12">
          <MyCard title="销售额占比">
            <div slot="extra">
              <a-button-group>
                <a-button type="default">全渠道</a-button>
                <a-button type="default">线上</a-button>
                <a-button type="default">门店</a-button>
              </a-button-group>
            </div>
            <ChartPieChart :option="picOpt"></ChartPieChart>
          </MyCard>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
  import countTo from 'vue-count-to'

  const searchData = []
  for (let i = 0; i < 50; i++) {
    searchData.push({
      id: i + 1,
      ranking: Math.floor(Math.random() * 100 + 1),
      keyword: '关键词-' + i,
      count: Math.floor(Math.random() * 1000),
      range: Math.floor(Math.random() * 1000),
      status: Math.floor((Math.random() * 10) % 2)
    })
  }

  export default {
    name: 'AnalysisComponent',
    components: { countTo },
    meta: { title: '分析页' },
    data () {
      return {
        loading: true,
        lineDataSource: [{ name: '', value: [150, 23, 224, 2, 135, 10, 260] }],
        lineOption: {
          grid: {
            left: '0',
            right: '0',
            bottom: '0',
            top: '10%'
          },
          xAxis: { show: false, axisLabel: { show: false } },
          yAxis: {
            show: false,
            axisLine: { show: false },
            axisLabel: { show: false },
            axisTick: { show: false },
            splitLine: { show: false }
          },
          series: [
            {
              lineStyle: {width: 0},
              showSymbol: false,
              areaStyle: {
                opacity: 0.8,
                color: ''
              }
            }
          ]
        },
        lineOption3: {},
        histDataSource: [
          { value: [34000, 25000, 11000, 9000, 7000, 6000, 4800, 7500] }
        ],
        histOption: {
          legend: { show: false },
          grid: {
            left: '0',
            right: '0',
            bottom: '0',
            top: '10%'
          },
          xAxis: { show: false, axisLabel: { show: false } },
          yAxis: {
            show: false,
            axisLine: { show: false },
            axisLabel: { show: false },
            axisTick: { show: false },
            splitLine: { show: false }
          }
        },
        tabsList: [{ label: '销售额', value: 1 }, { label: '访问量', value: 2 }],
        tabKey: 1,
        rankList: [
          { title: '桃源村一号店', value: 1234.56 },
          { title: '桃源村二号店', value: 1134.56 },
          { title: '桃源村三号店', value: 1034.56 },
          { title: '桃源村四号店', value: 934.56 },
          { title: '桃源村五号店', value: 834.56 },
          { title: '桃源村六号店', value: 734.56 },
          { title: '桃源村七号店', value: 634.56 },
          { title: '桃源村八号店', value: 534.56 }
        ],
        lineList: [
          { title: '天淘超市一号店', value: 12324.56 },
          { title: '淘气旗舰店店', value: 11334.56 },
          { title: '北京东三号店', value: 10344.56 },
          { title: '江苏四号店', value: 9344.56 },
          { title: '福建省厦门五号店', value: 8354.56 },
          { title: '三明市宁化淮土六号店', value: 7344.56 },
          { title: '孙坑村七号店', value: 6344.56 },
          { title: '御天屋八号店', value: 5354.56 }
        ],
        tabsOpt: {
          grid: {
            left: '0',
            right: '0',
            bottom: '0',
            top: '5%'
          }
        },
        picOpt: {
          legend: { show: false },
          series: [
            {
              radius: ['40%', '70%'],
              selectedMode: 'single',
              data: []
            }
          ]
        },
        searchData,
        columns: [
          {
            title: '排名',
            dataIndex: 'ranking',
            key: 'ranking',
            width: 60,
            align: 'center'
          },
          {
            title: '搜索关键词',
            dataIndex: 'keyword',
            key: 'keyword'
          },
          {
            title: '用户数据',
            dataIndex: 'count',
            key: 'count',
            align: 'center',
            sorter: (a, b) => a.count - b.count,
            sortDirections: ['ascend', 'descend']
          },
          {
            title: '周涨幅',
            dataIndex: 'range',
            key: 'range',
            width: 140,
            align: 'center',
            scopedSlots: { customRender: 'rang' }
          }
        ],
        pagination: {
          pageSize: 5
        }
      }
    },
    mounted () {
      this.lineOption.series[0].areaStyle.color = new this.$charts.graphic.LinearGradient(0, 0, 0, 1, [
        {offset: 0,color: 'rgb(84, 112, 198)'},
        {offset: 1,color: 'rgb(115, 148, 252)'}
      ])
      const opt = this.$lodash.cloneDeep(this.lineOption)
      this.lineOption3 = Object.assign({}, opt, {
        color: ['#326d2f'],
        series: [
          {
            lineStyle: { width: 0 },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new this.$charts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: '#a4f89f'
                },
                {
                  offset: 1,
                  color: '#307c0c'
                }
              ])
            }
          }
        ]
      })
      this.$nextTick(() => {
        this.loading = false
      })
    },
    methods: {}
  }
</script>

<style scoped lang="scss">
  .card-chart {
    height: 100px;
    display: flex;
    align-items: center;
  }
</style>
