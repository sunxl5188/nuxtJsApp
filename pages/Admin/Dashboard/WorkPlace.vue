<template>
  <div>
    <a-row :gutter="20">
      <a-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16" :xxl="16">
        <MyCard title="进行中的项目" extra :body-style="{padding:0}">
          <template #extra>
            <a-button type="link" size="small">全部项目</a-button>
          </template>
          <a-card-grid v-for="(item, i) in projects" :key="i">
            <MyCard :body-style="{padding:0}">

              <a-card-meta :description="item.desc">
                <div slot="title" class="card-title">
                  <a-avatar size="small" :src="item.logo"/>
                  <span>Alipay</span>
                </div>
              </a-card-meta>
              <div class="d-flex justify-content-between font-12 pt-3">
                <a href="/#/" class="text-secondary">科学搬砖组</a>
                <span class="datetime">9小时前</span>
              </div>
            </MyCard>
          </a-card-grid>
        </MyCard>
        <MyCard title="动态">
          <MyList :data-source="activities"></MyList>
        </MyCard>
      </a-col>
      <a-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8" :xxl="8">
        <MyCard title="产品指数">
          <ChartRadarChart :data-source="dataSource" :option="option" height="275"/>
        </MyCard>
        <MyCard title="团队">
          <a-row>
            <a-col v-for="(item, index) in teams" :key="index" :span="12" class="u-p-t-12 u-p-b-12">
              <nuxt-link to="/" class="d-flex justify-content-start align-items-center">
                <a-avatar size="small" :src="item.avatar" class="flex-grow-0 flex-shrink-0" />
                <span class="u-line-1 u-m-l-5">{{item.name}}</span>
              </nuxt-link>
            </a-col>
          </a-row>
        </MyCard>
      </a-col>
    </a-row>
  </div>
</template>

<script>

  export default {
    name: 'WorkPlace',
    meta: { title: '工作台' },
    data () {
      return {
        projects: [
          {
            'logo': 'https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png',
            'desc': '希望是一个好东西，也许是最好的，好东西是不会消亡的'
          },
          {
            'logo': 'https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png',
            'desc': '希望是一个好东西，也许是最好的，好东西是不会消亡的'
          },
          {
            'logo': 'https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png',
            'desc': '希望是一个好东西，也许是最好的，好东西是不会消亡的'
          },
          {
            'logo': 'https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png',
            'desc': '希望是一个好东西，也许是最好的，好东西是不会消亡的'
          },
          {
            'logo': 'https://gw.alipayobjects.com/zos/rmsportal/kZzEzemZyKLKFsojXItE.png',
            'desc': '那时候我只会想自己想要什么，从不想自己拥有什么'
          },
          {
            'logo': 'https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png',
            'desc': '城镇中有那么多的酒馆，她却偏偏走进了我的酒馆'
          }],
        activities: [
          {
            desc: '1小时前',
            avatar: 'https://gw.alipayobjects.com/zos/rmsportal/cnrhVkzwxjPwAaCfPbdc.png',
            title: '曲丽丽 在 <span class="text-success">高逼格设计天团</span> 新建项目 <span class="text-danger">八月迭代</span>'
          },
          {
            desc: '9小时前',
            avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
            title: '付晓晓 在 <span class="text-success">高逼格设计天团</span> 发布了 <span class="text-danger">留言</span>'
          },
          {
            desc: '3分钟前',
            avatar: 'https://gw.alipayobjects.com/zos/rmsportal/gaOngJwsRYRaVAuXXcmB.png',
            title: '林东东 将 <span class="text-success">项目进展</span> 更新至已发布状态'
          },
          {
            desc: '刚刚',
            avatar: 'https://gw.alipayobjects.com/zos/rmsportal/WhxKECPNujWoWEFNdnJE.png',
            title: '周星星 在 <span class="text-success">科学搬砖组</span> 新建项目 <span class="text-danger">八月迭代</span>'
          },
          {
            desc: '1天前',
            avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ubnKSIfAJTxIgXOKlciN.png',
            title: '朱偏右 在 <span class="text-success">骗你学计算机</span> 发布了 <span class="text-danger">留言</span>'
          },
          {
            desc: '7小时前',
            avatar: 'https://gw.alipayobjects.com/zos/rmsportal/jZUIxmJycoymBprLOUbT.png',
            title: '勒个 将 <span class="text-success">项目进展</span> 更新至已发布状态'
          }],
        teams: [
          {
            'name': '高逼格设计天团',
            'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/cnrhVkzwxjPwAaCfPbdc.png'
          },
          {
            'name': '中二少女团',
            'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png'
          },
          {
            'name': '科学搬砖组',
            'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/gaOngJwsRYRaVAuXXcmB.png'
          },
          {
            'name': '骗你学计算机',
            'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/WhxKECPNujWoWEFNdnJE.png'
          },
          { 'name': '程序员日常', 'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/ubnKSIfAJTxIgXOKlciN.png' }
        ],
        dataSource: [
          {
            value: [42, 90, 88, 65, 50, 70],
            name: '已分配预算'
          },
          {
            value: [5, 45, 78, 65, 80, 15],
            name: '实际支出'
          }
        ],
        option: {
          radar: {
            indicator: [
              { name: '销售', max: 100 },
              { name: '管理', max: 100 },
              { name: '信息技术', max: 100 },
              { name: '客服', max: 100, color: '#f00' },
              { name: '研发', max: 100 },
              { name: '市场', max: 100, color: '#f60' }
            ]
          },
          series: [{
            areaStyle: { opacity: 0.2 }
          }]
        },
        tabList: [
          {
            key: 'tab1',
            tab: 'tab1'
          },
          {
            key: 'tab2',
            tab: 'tab2',
          }
        ],
        key: 'tab1'
      }
    },
    mounted () {

    },
    methods: {}
  }
</script>

<style scoped>

</style>
