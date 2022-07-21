<template>
    <MyCard title="分步表单">
        <MySteps :current="current" :step-list="stepList" class="steps"></MySteps>
        <div class="u-p-t-50 u-p-b-50"></div>

        <!--**********************************************************-->

        <div class="form-box u-p-b-32">
            <MyForm
                    v-if="current===0"
                    :item-list="itemList"
                    :data-source="dataSource"
                    submit-text="下一步"
                    @onSubmit="onSubmit">
                <span slot="money_prefix">￥</span>
            </MyForm>
            <div v-if="current===1">
                <a-alert
                        message="确认转账后，资金将直接打入对方账户，无法退回。"
                        type="warning"
                        show-icon
                        closable
                        class="u-m-b-25"
                />
                <a-form :label-col="{span:5}" :wrapper-col="{ span: 19 }">
                    <a-form-item label="付款账户">
                        {{form.username}}
                    </a-form-item>
                    <a-form-item label="收款账户">
                        {{form.collection}}
                    </a-form-item>
                    <a-form-item label="收款人姓名">
                        {{form.collectionName}}
                    </a-form-item>
                    <a-form-item label="转账金额">
                        {{form.money}}
                    </a-form-item>
                    <a-form-item :wrapper-col="{span:19, offset:5}">
                        <a-button :loading="payload" type="primary" @click="onConfirm">确定</a-button>
                        <a-button type="default" class="ml-5" @click="current=0">上一步</a-button>
                    </a-form-item>
                </a-form>
            </div>
            <div v-if="current===2">
                <MyResult state="success" title="支付成功"/>
                <div class="text-center">
                    <a-button type="primary" @click="onFinish">再转一笔</a-button>
                    <a-button class="ml-5" @click="$router.push('/Admin')">查看账单</a-button>
                </div>
            </div>
        </div>
    </MyCard>
</template>

<script>
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
            title: '完成'
          }
        ],
        itemList: [
          {
            label: '付款账户',
            name: 'username',
            placeholder: '请输入付款账户',
            rules: [{
              required: true,
              message: '付款账户不能为空!'
            }]
          },
          {
            label: '收款账户',
            name: 'collection',
            placeholder: '请输入收款账户',
            rules: [{
              required: true,
              message: '收款账户不能为空!'
            }],
            addonBefore: {
              name: 'payment_after',
              option: branch
            }
          },
          {
            label: '收款人姓名',
            name: 'collectionName',
            placeholder: '请输入收款人姓名',
            rules: [{
              required: true,
              message: '收款人姓名不能为空!'
            }]
          },
          {
            label: '转账金额',
            name: 'money',
            placeholder: '请输入金额',
            prefix: true,
            rules: [{
              required: true,
              message: '转账金额不能为空!'
            }, {
              pattern: /^0\.([1-9]|\d[1-9])$|^[1-9]\d{0,8}\.\d{0,2}$|^[1-9]\d{0,8}$/,
              message: '请输入数字类型的金额'
            }]
          }
        ],
        dataSource: {
          username: 'ant-design@alipay.com',
          collection: 'you@example.com',
          collectionName: 'Alex',
          money: 5000
        },
        payload: false,
        form: {}
      }
    },
    mounted () {},
    methods: {
      onSubmit (data) {
        this.current = 1
        this.form = data
      },
      onConfirm () {
        this.payload = true
        this.$lodash.delay(() => {
          this.payload = false
          this.current = 2
          this.stepList[2].status = 'finish'
        }, 1500)
      },
      onFinish () {
        this.current = 0
        delete this.stepList[2].status
      }
    }
  }
</script>

<style scoped lang="scss">
    .steps {
        width: 500px;
        margin: 16px auto;
    }

    .form-box {
        width: 500px;
        margin: 0 auto;
    }
</style>
