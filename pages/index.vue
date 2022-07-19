<template>
  <div class="container">
    <nuxt-link to="/article/1">新闻</nuxt-link>
    <nuxt-link to="login">登录</nuxt-link>
    <nuxt-link to="admin">进入后台</nuxt-link>

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
    components: {},
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
            scopedSlots: { customRender: 'rang' }
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
<style scoped lang="scss">

</style>
