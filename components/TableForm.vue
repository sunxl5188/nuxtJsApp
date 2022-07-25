<template>
    <div>
        <a-table
                :loading="loading"
                :columns="columns"
                :data-source="dataSource"
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
    model: {
      prop: 'dataSource',
      event: 'change'
    },
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
        columnField: []
      }
    },
    mounted () {
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
      onAddRow () {
        const newArr = [{
          id: this.dataSource.length + 1,
          ranking: '',
          jobNumber: '',
          name: '',
          department: '',
          editState: true,
          isNew: true
        }]
        this.$emit('change', [...this.dataSource, ...newArr])
      },
      onEditor (id) {
        const dataList = [...this.dataSource]
        const target = dataList.filter(item => item.id === id)[0]
        target.editState = true
        this.$emit('change', dataList)
      },
      onDelete (id) {
        const dataList = [...this.dataSource]
        this.$lodash.pullAllBy(dataList, [{ id }], 'id')
        this.$emit('change', dataList)
      },
      onSaveRow (id) {
        const dataList = [...this.dataSource]
        const target = dataList.filter(item => item.id === id)[0]
        target.editState = false
        delete target.isNew
        this.$emit('change', dataList)
      },
      onCancel (id) {
        const dataList = [...this.dataSource]
        const target = dataList.filter(item => item.id === id)[0]
        target.editState = false
        this.$emit('change', dataList)
      },
      handleChange (value, id, column) {
        const newData = [...this.dataSource]
        const target = newData.filter(item => item.id === id)[0]
        if (target) {
          target[column] = value
          this.$emit('change', newData)
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
