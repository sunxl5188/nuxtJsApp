<template>
    <MyCard title="分步表单">
        <MySteps :step-list="stepList" class="steps"></MySteps>
        <!--**********************************************************-->
        <MyForm :item-list="itemList" @onSubmit="onSubmit">
        </MyForm>
    </MyCard>
</template>

<script>
  const option = [
    {
      label: '互联网',
      value: 1
    },
    {
      label: '实体经营',
      value: 2
    },
    {
      label: '个体户',
      value: 3
    },
    {
      label: '政府机构',
      value: 4
    },
    {
      label: '教育机构',
      value: 5
    }
  ]
  const validator = (rule, value, callback) => {
    const len = value.length
    if (len === 0) {
      callback(new Error('请选择'))
    } else if (len < 2) {
      callback(new Error('至少选择两项'))
    } else {
      callback()
    }
  }

  export default {
    name: 'StepForm',
    components: {},
    meta: { title: '分步表单' },
    data () {
      return {
        current: 0,
        stepList: [
          {
            title: '请填写转账信息'
          },
          {
            title: '确认转账信息'
          },
          {
            title: '完成',
            status: 'finish'
          }
        ],
        itemList: [
          {
            label: '用户呢称',
            name: 'username',
            placeholder: '请输入用户呢称',
            rules: [{
              required: true,
              message: '用户呢称不能为空!'
            }]
          },
          {
            label: '详细地址',
            name: 'address',
            placeholder: '请输入详细地址',
            rules: [{
              required: true,
              message: '详细地址不能为空!'
            }]
          },
          {
            type: 'select',
            label: '产品分类',
            name: 'classId',
            placeholder: '请选择产品分类',
            option
          },
          {
            label: '日期选择',
            name: 'times',
            placeholder: '请选择日期选择!!!',
            type: 'date'
          },
          {
            label: '日期范围',
            name: 'rangeTime',
            placeholder: '请选择日期范围!!!',
            type: 'range'
          },
          {
            label: '备注',
            name: 'remarks',
            type: 'textarea',
            placeholder: '请输入备注信息！'
          },
          {
            label: '权重',
            name: 'weights',
            type: 'number',
            min: 1,
            max: 100
          },
          {
            label: '单选',
            name: 'radios',
            type: 'radio',
            option: [
              { label: '单选一', value: 1 },
              { label: '单选二', value: 2 },
              { label: '单选三', value: 3 }
            ],
            rules: [{
              required: true,
              message: '单选项不能为容'
            }]
          },
          {
            label: '多选项',
            name: 'checks',
            type: 'checkbox',
            option: [
              { label: '蓝球', value: 1 },
              { label: '足球', value: 2 },
              { label: '高尔夫', value: 3 }
            ],
            rules: [{validator}]
          }
        ]
      }
    },
    methods: {
      onSubmit (data) {
        console.log(data)
      }
    }
  }
</script>

<style scoped lang="scss">
    .steps {
        width: 500px;
        margin: 16px auto;
    }
</style>
