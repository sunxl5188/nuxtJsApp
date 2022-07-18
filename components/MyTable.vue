<template>
  <div>
    <a-table
      :columns="columns"
      :data-source="dataSource"
      :row-key="lists => lists.index"
      :size="$attrs.size"
      :pagination="paginationConfig"
      @change="onChange"
    >
      <template v-for="(item, index) in slotsArr">
        <span :slot="item.scopedSlots.customRender" :key="index" slot-scope="row">
          <slot :name="item.scopedSlots.customRender" :row="row"></slot>
        </span>
      </template>
    </a-table>
  </div>
</template>

<script>
  export default {
    name: 'MyTable',
    components: {},
    props: {
      dataSource: {
        type: Array,
        default () {
          return []
        }
      },
      columns: {
        type: Array,
        default () {
          return []
        }
      },
      // 分页
      pagination: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    data () {
      return {
        paginationConfig: {
          current: 1,
          pageSize: 15
        }
      }
    },
    computed: {
      slotsArr () {
        // const arr = this.$lodash.filter(this.columns, o => Object.prototype.toString.call(o.scopedSlots) === '[object Object]')
        // console.log(arr)
        return []
      }
    },
    watch: {},
    mounted () {
      Object.assign(this.paginationConfig, this.pagination)
    },
    methods: {
      onChange (pagination, filters, sorter, { currentDataSource }) {
        const params = { pagination, filters, sorter, currentDataSource }
        const { current } = params. pagination
        this.paginationConfig.current = current
        this.$emit('change', params)
      }
    }
  }
</script>

<style scoped>

</style>
