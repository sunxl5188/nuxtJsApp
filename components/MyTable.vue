<template>
    <div>
        <a-table
                :loading="loading"
                :row-selection="showSelection ? {
                  selectedRowKeys: selectedRowKeys,
                  onChange: (row) => selectedRowKeys = row
                } : null"
                :columns="columnData"
                :data-source="dataSource"
                :row-key="row => row.id"
                :size="$attrs.size"
                :pagination="paginationConfig"
                @change="handleChange"
        >
            <!--操作按钮插槽-->
            <div slot="operation" slot-scope="text, record, index" class="operation">
                <slot name="operation" :row="{text, record, index}">
                    <a-button type="link" size="small" @click="handleSeeDetail(record)">详情</a-button>
                    <a-button type="link" size="small" @click="handleEditDetail(record)">编辑</a-button>
                    <a-popconfirm title="您确定删除此任务吗?" @confirm="handleDelete(record)">
                        <a-button type="link" size="small">删除</a-button>
                    </a-popconfirm>
                    <slot name="extra-operation"></slot>
                </slot>
            </div>
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
      },
      // 是否显示操作按钮
      showOperation: {
        type: Boolean,
        default: false
      },
      showSelection: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        loading: true,
        columnData: [],
        selectedRowKeys: [],
        paginationConfig: {
          current: 1,
          pageSize: 15
        }
      }
    },
    mounted () {
      Object.assign(this.paginationConfig, this.pagination)

      // 合并操作字段
      if (this.showOperation) {
        let assignData = {}
        const action = [{
          title: '操作',
          key: 'operation',
          align: 'center',
          scopedSlots: { customRender: 'operation' }
        }]
        const isBoole = this.$lodash.filter(this.columns, o => o.key === 'operation' || o.title === '操作')
        if (isBoole.length > 0) {
          assignData = [...this.columns]
        } else {
          assignData = [...this.columns, ...action]
        }
        this.columnData = assignData
      } else {
        this.columnData = this.columns
      }

      this.$nextTick(() => {
        this.loading = false
      })

    },
    methods: {
      onSelectChange (selectedRowKeys) {
        this.selectedRowKeys = selectedRowKeys
      },
      handleChange (pagination, filters, sorter, { currentDataSource }) {
        const params = { pagination, filters, sorter, currentDataSource }
        const { current } = params.pagination
        this.paginationConfig.current = current
        this.$emit('change', params)
      },
      // 跳转详情页
      handleSeeDetail ({ id }) {
        this.$emit('onSeeDetail', id)
      },
      // 跳转详情页
      handleEditDetail ({ id }) {
        this.$emit('onEditDetail', id)
      },
      // 删除一条信息
      handleDelete ({ id }) {
        this.$emit('onDelete', id)
      }
    }
  }
</script>

<style scoped lang="scss">
.operation {
    & button {
        padding: 0;
        margin-right: 8px;

        &:last-child {
            margin-right: 0;
        }
    }

    &::v-deep button {
        padding: 0;
    }
}
</style>
