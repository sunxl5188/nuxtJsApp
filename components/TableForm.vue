<template>
    <div>
        <a-table
                :loading="loading"
                :columns="columns"
                :data-source="source"
                :row-key="row => row.id"
                :pagination="false"
        >
            <template v-for="(col, i) in columnField" :slot="col" slot-scope="text, record">
                <a-input
                        v-if="record.editState"
                        :key="col"
                        :value="text"
                        :placeholder="columns[i].title"
                        @change="e => handleChange(e.target.value, record.id, col)"
                />
                <template v-else>{{text}}</template>
            </template>
            <!--******************************************************-->
            <div slot="operation" slot-scope="text, record, index" class="operation-btn">
                <slot name="operation" :row="{record, index}">
                    <template v-if="record.editState">
                        <template v-if="record.isNew">
                            <a-button type="link" size="small" @click="onSaveRow(record.id)">添加</a-button>
                            <a-divider type="vertical"/>
                            <a-popconfirm
                                    title="是否要删除此行?"
                                    @confirm="onDelete(record.id)"
                            >
                                <a-button type="link" size="small">删除</a-button>
                            </a-popconfirm>
                        </template>
                        <template v-else>
                            <a-button type="link" size="small" @click="onSaveRow(record.id)">保存</a-button>
                            <a-divider type="vertical"/>
                            <a-button type="link" size="small" @click="onCancel(record.id)">取消</a-button>
                        </template>
                    </template>
                    <template v-else>
                        <a-button type="link" size="small" @click="onEditor(record.id)">编辑</a-button>
                        <a-divider type="vertical"/>
                        <a-popconfirm
                                title="是否要删除此行?"
                                @confirm="onDelete(record.id)"
                        >
                            <a-button type="link" size="small">删除</a-button>
                        </a-popconfirm>
                    </template>
                </slot>
            </div>
        </a-table>
        <a-button
                type="dashed"
                icon="plus"
                class="w-100 u-m-t-16 u-m-b-8"
                @click="onAddRow">
            {{buttonText}}
        </a-button>
    </div>
</template>

<script>
  export default {
    name: 'TableForm',
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
      buttonText: {
        type: String,
        default: '添加成员'
      }
    },
    data () {
      return {
        loading: true,
        source: [],
        columnField: []
      }
    },
    watch: {
      dataSource: {
        handler () {
          this.setTableData()
        },
        deep: true
      }
    },
    mounted () {
      this.setTableData()
      const columnList = this.$lodash.cloneDeep(this.columns)
      columnList.pop()
      columnList.forEach(item => {
        this.columnField.push(item.dataIndex)
      })
      this.$nextTick(() => {
        this.loading = false
      })
    },
    methods: {
      setTableData () {
        this.source = this.$lodash.cloneDeep(this.dataSource)
        this.source.map(item => {
          return this.$lodash.assign(item, { editState: false })
        })
      },
      onAddRow () {
        this.source.push({
          id: this.source.length + 1,
          ranking: '',
          jobNumber: '',
          name: '',
          department: '',
          editState: true,
          isNew: true
        })
      },
      onEditor (id) {
        const dataList = [...this.source]
        const target = dataList.filter(item => item.id === id)[0]
        target.editState = true
        this.source = dataList
      },
      onDelete (id) {
        const dataList = [...this.source]
        this.$lodash.pullAllBy(dataList, [{ id }], 'id')
        this.source = dataList
      },
      onSaveRow (id) {
        const dataList = [...this.source]
        const target = dataList.filter(item => item.id === id)[0]
        target.editState = false
        delete target.isNew
        this.source = dataList
        this.$emit('onSubmit', this.source)
      },
      onCancel (id) {
        const dataList = [...this.source]
        const target = dataList.filter(item => item.id === id)[0]
        target.editState = false
        this.source = dataList
      },
      handleChange (value, id, column) {
        const newData = [...this.source]
        const target = newData.filter(item => item.id === id)[0]
        if (target) {
          target[column] = value
          this.source = newData
        }
      }
    }
  }
</script>

<style scoped lang="scss">
    .operation-btn {
        button {
            padding: 0;
            line-height: 1;
            height: 16px;
        }
    }

    ::v-deep input {
        margin: -6px 0;
    }
</style>
