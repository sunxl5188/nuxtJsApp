<template>
    <MyCard title="Form表单">
      <MyForm :item-list="itemList" :wrapper-col="12" @onSubmit="onSubmit">
        <span slot="address_addonBefore">https://</span>
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
  const branch = [
    {
      label: '数字人民币',
      value: 1
    }, {
      label: '网银',
      value: 2
    }, {
      label: '支付宝',
      value: 3
    }, {
      label: '微信',
      value: 4
    }
  ]
  const emailAddress = [
    {
      label: '@163.com',
      value: '@163.com'
    },
    {
      label: '@qq.com',
      value: '@qq.com'
    },
    {
      label: '@126.com',
      value: '@126.com'
    },
    {
      label: '@sina.com',
      value: '@sina.com'
    }
  ]
  const validator = (rule, value, callback) => {
    const len = value.length
    if (len !== 0 && len < 2) {
      callback(new Error('至少选择两项'))
    } else {
      callback()
    }
  }
  export default {
    name: 'OneForm',
    data () {
      return {
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
            type: 'password',
            label: '登录密码',
            name: 'password',
            placeholder: '请输入登录密码',
            rules: [{
              required: true,
              message: '登录密码不能为空!'
            }]
          },
          {
            label: '详细地址',
            name: 'address',
            placeholder: '请输入详细地址',
            addonBefore: true,
            rules: [{
              required: true,
              message: '详细地址不能为空!'
            }]
          },
          {
            label: '邮箱地址',
            name: 'email',
            placeholder: '请输入邮箱地址',
            addonAfter: {
              name: 'email_after',
              option: emailAddress
            },
            rules: [{
              required: true,
              message: '详细地址不能为空!'
            }]
          },
          {
            label: '支付方式',
            name: 'payment',
            placeholder: '请输入金额',
            addonBefore: {
              name: 'payment_after',
              option: branch
            },
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
            rules: [{
              required: true,
              message: '多选项不能为容'
            }, { validator }]
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

<style scoped>

</style>
