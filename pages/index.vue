<template>
  <div class="container">
    <nuxt-link to="/article/1">新闻</nuxt-link>
    <nuxt-link to="login">登录</nuxt-link>
    <nuxt-link to="admin">进入后台</nuxt-link>
    sdn已为您找到关于client-only标签干什么用相关内容,包含client-only标签干什么用相关文档代码介绍、相关教程视频课程,以及相关client-only标签干什么用问答内容。为您解决当下相.

    <a-button type="primary" ghost>确定</a-button>
    <a-menu
      style="width: 256px"
      :default-selected-keys="['1']"
      mode="inline"
    >
      <a-sub-menu key="sub1">
        <span slot="title"><a-icon type="mail" /><span>Navigation One</span></span>
        <a-menu-item-group key="g1">
          <template slot="title"> <a-icon type="qq" /><span>Item 1</span> </template>
          <a-menu-item key="1">
            Option 1
          </a-menu-item>
          <a-menu-item key="2">
            Option 2
          </a-menu-item>
        </a-menu-item-group>
        <a-menu-item-group key="g2" title="Item 2">
          <a-menu-item key="3">
            Option 3
          </a-menu-item>
          <a-menu-item key="4">
            Option 4
          </a-menu-item>
        </a-menu-item-group>
      </a-sub-menu>
      <a-sub-menu key="sub2">
        <span slot="title"><a-icon type="appstore" /><span>Navigation Two</span></span>
        <a-menu-item key="5">
          Option 5
        </a-menu-item>
        <a-menu-item key="6">
          Option 6
        </a-menu-item>
        <a-sub-menu key="sub3" title="Submenu">
          <a-menu-item key="7">
            Option 7
          </a-menu-item>
          <a-menu-item key="8">
            Option 8
          </a-menu-item>
        </a-sub-menu>
      </a-sub-menu>
      <a-sub-menu key="sub4">
        <span slot="title"><a-icon type="setting" /><span>Navigation Three</span></span>
        <a-menu-item key="9">
          Option 9
        </a-menu-item>
        <a-menu-item key="10">
          Option 10
        </a-menu-item>
        <a-menu-item key="11">
          Option 11
        </a-menu-item>
        <a-menu-item key="12">
          Option 12
        </a-menu-item>
      </a-sub-menu>
    </a-menu>
    <a-dropdown>
      <a class="ant-dropdown-link" @click="e => e.preventDefault()">
        Hover me <a-icon type="down" />
      </a>
      <a-menu slot="overlay">
        <a-menu-item>
          <a href="javascript:;">1st menu item</a>
        </a-menu-item>
        <a-menu-item>
          <a href="javascript:;">2nd menu item</a>
        </a-menu-item>
        <a-menu-item>
          <a href="javascript:;">3rd menu item</a>
        </a-menu-item>
      </a-menu>
    </a-dropdown>
  </div>
</template>

<script>
  const searchData = []
  for (let i = 0; i < 50; i++) {
    searchData.push({
      index: i + 1,
      keyword: '关键词-' + i,
      count: Math.floor(Math.random() * 1000),
      range: Math.floor(Math.random() * 100),
      status: Math.floor((Math.random() * 10) % 2)
    })
  }

  export default {
    name: 'IndexPage',
    components: { },
    asyncData ({ query }) {
      return query
    },
    data () {
      return {
        load: true,
        searchData,
        columns: [
          {
            title: '排名',
            dataIndex: 'index',
            key: 'index',
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
            scopedSlots: {customRender: 'rang'}
          }
        ]
      }
    },
    fetch (content) {},
    computed: {},
    mounted () {
    },
    methods: {}
  }
</script>
<style lang="scss">

</style>
