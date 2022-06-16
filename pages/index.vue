<template>
  <div>
    <SearchFilter
      :item-list="itemList"
    />
  </div>
</template>

<script>
  import SearchFilter from '~/components/SearchFilter'
  const options = [
    {
      label: '产品一',
      value : 1
    },
    {
      label: '产品二',
      value: 2
    }
  ]

  export default {
    name: 'IndexPage',
    components: { SearchFilter },
    asyncData ({ query }) {
      return query
    },
    data () {
      return {
        itemList: [
          {
            label: '用户姓名',
            name: 'username',
            placeholder: '请输入用户姓名！！！'
          },
          {
            label: '产品类型',
            name: 'proType',
            placeholder: '请选择产品类型',
            type: 'select',
            option: options
          },
          {
            label: '日期选择',
            name: 'times',
            placeholder: '请选择日期选择!!!',
            type: 'date'
          }
        ]
      }
    },
    fetch (content) {},
    computed: {},
    mounted () {
      console.log(this.moment().endOf('day'))
    },
    methods: {}
  }
</script>
<style lang="scss">

</style>
