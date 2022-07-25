<template>
    <div>
        <MyCard title="仓库管理">
            <MyFormRow
                    ref="repository"
                    :item-list="warehouse"
            >
                <span slot="domainName_addonBefore">https://</span>
                <span slot="domainName_addonAfter">.github.io</span>
            </MyFormRow>
        </MyCard>
        <MyCard title="任务管理">
            <MyFormRow
                    ref="task"
                    :item-list="task"
            >
                <span slot="domainName_addonBefore">https://</span>
                <span slot="domainName_addonAfter">.github.io</span>
            </MyFormRow>
        </MyCard>
        <MyCard title="用户管理">
            <TableForm
                    v-model="dataSource"
                    :columns="columns"
                    @onSubmit="userListChange"
            >
            </TableForm>
        </MyCard>
        <MyCard>
            <div class="text-center">
                <a-button type="primary" size="large" @click="submitSave">提交保存</a-button>
            </div>
        </MyCard>
    </div>
</template>

<script>
  export default {
    name: 'AdvancedForm',
    meta: { title: '高级表单' },
    data () {
      return {
        warehouse: [
          {
            label: '仓库名',
            name: 'warehouseName',
            placeholder: '请输入仓库名',
            rules: [{
              required: true,
              message: '仓库名不能为空!'
            }]
          },
          {
            label: '仓库域名',
            name: 'domainName',
            placeholder: '请输入仓库域名',
            addonBefore: true,
            addonAfter: true,
            rules: [{
              required: true,
              message: '仓库域名不能为空!'
            }]
          },
          {
            type: 'select',
            label: '仓库管理员',
            name: 'administrators',
            placeholder: '请选择仓库管理员',
            option: [
              { label: '王同学', value: 1 },
              { label: '李同学', value: 2 },
              { label: '赵同学', value: 3 },
              { label: '陈同学', value: 4 },
              { label: '孙同学', value: 5 }
            ],
            rules: [{
              required: true,
              message: '仓库管理员不能为空!'
            }]
          },
          {
            type: 'select',
            label: '审批人员',
            name: 'approver',
            placeholder: '请选择审批人员',
            option: [
              { label: '王晓丽', value: 1 },
              { label: '李军', value: 2 },
              { label: '唐僧', value: 3 },
              { label: '悟空', value: 4 }
            ],
            rules: [{
              required: true,
              message: '审批人员不能为空!'
            }]
          },
          {
            type: 'range',
            label: '生效日期',
            name: 'effectiveDate',
            placeholder: '请选择生效日期',
            rules: [{
              required: true,
              message: '生效日期不能为空!'
            }]
          },
          {
            type: 'select',
            label: '仓库类型',
            name: 'warehouseType',
            placeholder: '请选择仓库类型',
            option: [
              { label: '公开', value: 1 },
              { label: '私密', value: 2 }
            ],
            rules: [{
              required: true,
              message: '仓库类型不能为空!'
            }]
          }
        ],
        task: [
          {
            label: '任务名',
            name: 'taskName',
            placeholder: '请输入任务名',
            rules: [{
              required: true,
              message: '任务名不能为空!'
            }]
          },
          {
            label: '任务描述',
            name: 'describe',
            placeholder: '请输入任务描述',
            rules: [{
              required: true,
              message: '任务描述不能为空!'
            }]
          },
          {
            type: 'select',
            label: '执行人员',
            name: 'executor',
            placeholder: '请选择执行人员',
            option: [
              { label: '黄小丽', value: 1 },
              { label: '李小明', value: 2 },
              { label: '赵大宝', value: 3 }
            ],
            rules: [{
              required: true,
              message: '执行人员不能为空!'
            }]
          },
          {
            type: 'select',
            label: '责任人',
            name: 'personLiable',
            placeholder: '请选择责任人',
            option: [
              { label: '王晓美', value: 1 },
              { label: '李军', value: 2 },
              { label: '唐僧', value: 3 },
              { label: '悟空', value: 4 }
            ],
            rules: [{
              required: true,
              message: '责任人不能为空!'
            }]
          },
          {
            type: 'date',
            label: '提醒时间',
            name: 'times',
            showTime: true,
            format: 'yyyy-MM-DD HH:mm:ss',
            placeholder: '请选择提醒时间',
            rules: [{
              required: true,
              message: '提醒时间不能为空!'
            }]
          },
          {
            type: 'select',
            label: '任务类型',
            name: 'taskType',
            placeholder: '请选择任务类型',
            option: [
              { label: '定时执行', value: 1 },
              { label: '周期执行', value: 2 }
            ],
            rules: [{
              required: true,
              message: '任务类型不能为空!'
            }]
          }
        ],
        columns: [
          {
            title: '排名',
            dataIndex: 'ranking',
            key: 'ranking',
            align: 'center',
            width: 170,
            scopedSlots: { customRender: 'ranking' }
          },
          {
            title: '工号',
            dataIndex: 'jobNumber',
            key: 'jobNumber',
            align: 'center',
            width: 170,
            scopedSlots: { customRender: 'jobNumber' }
          },
          {
            title: '成员姓名',
            dataIndex: 'name',
            key: 'name',
            width: 200,
            scopedSlots: { customRender: 'name' }
          },
          {
            title: '所属部门',
            dataIndex: 'department',
            key: 'department',
            align: 'center',
            scopedSlots: { customRender: 'department' }
          },
          {
            title: '操作',
            key: 'operation',
            align: 'center',
            width: 180,
            scopedSlots: { customRender: 'operation' }
          }
        ],
        dataSource: [
          {
            id: 1,
            ranking: 1,
            jobNumber: '888',
            name: '悟空',
            department: '技术部'
          },
          {
            id: 2,
            ranking: 2,
            jobNumber: '018',
            name: '唐僧',
            department: '行政部'
          },
          {
            id: 3,
            ranking: 4,
            jobNumber: '008',
            name: '沙禾尚',
            department: 'IT部'
          },
          {
            id: 4,
            ranking: 3,
            jobNumber: '001',
            name: '八戒',
            department: '吴乐部'
          }
        ]
      }
    },
    methods: {
      userListChange (data) {
        console.log(data)
      },
      submitSave () {
        const params = {}
        let form1 = {}
        let form2 = {}
        this.$refs.repository.form.validateFields((err, values) => {
          form1 = {
            err, values
          }
        })
        this.$refs.task.form.validateFields((err, values) => {
          form2 = {
            err, values
          }
        })

        if (!form1.err && !form2.err) {
          const tableData = this.$lodash.filter(this.dataSource, item => !item.editState)
          tableData.forEach(item => {
            delete item.isNew
            delete item.editState
          })
          params.tableData = tableData
          this.$lodash.assign(params, form1.values, form2.values)
          for (const i in params) {
            if (Object.prototype.toString.call(params[i]) === '[object Array]') {
              params[i] = JSON.stringify(params[i])
            }
          }
          console.log(params)
        }
      }
    }
  }
</script>

<style scoped>

</style>
