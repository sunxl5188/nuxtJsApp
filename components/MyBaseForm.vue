<template>
  <a-form-model
    ref="myform"
    layout="horizontal"
    :model="myform"
    :rules="rules"
    :label-col="{span:labelCol}"
    :wrapper-col="{span:24-labelCol}"
    @submit.prevent="submitSave"
  >
    <template v-for="(item, i) in itemList">
      <a-form-model-item
        v-if="item.type!=='custom'"
        :key="i"
        :label="item.label"
        :prop="item.name"
        :has-feedback="!['radio', 'checked'].includes(item.type)"
      >
        <!--文本输入框-->
        <template v-if="item.type === undefined || item.type === 'text'">
          <a-input
            v-model="myform[item.name]"
            :placeholder="item.placeholder || `请输入${item.label}`"
            allow-clear
            autocomplete="off"
          />
        </template>
        <!--密码输入框-->
        <template v-if="item.type === 'password'">
          <a-input
            v-model="myform[item.name]" type="password" :placeholder="item.placeholder || `请输入${item.label}`"
            autocomplete="off"/>
        </template>
        <!--选择框-->
        <template v-if="item.type==='select'">
          <a-select
            v-model="myform[item.name]"
            show-search
            allow-clear
            option-filter-prop="children"
            :filter-option="filterOption"
            :mode="item.multiple||'default'"
          >
            <a-select-option v-for="items of item.option" :key="items.value" :value="items.value">
              {{items.label}}
            </a-select-option>
          </a-select>
        </template>
        <!--文本域-->
        <template v-if="item.type==='textarea'">
          <a-input
            v-model="myform[item.name]"
            type="textarea"
            :placeholder="item.placeholder || `请输入${item.label}`"
            :auto-size="{ minRows: 3, maxRows: 6 }"
          />
        </template>
        <!--日期选择-->
        <template v-if="item.type === 'date'">
          <a-date-picker
            v-model="myform[item.name]"
            :value-format="item.format || 'yyyy-MM-DD'"
            :format="item.format || 'yyyy-MM-DD'"
            :placeholder="item.placeholder || `请输入${item.label}`"
            :input-read-only="true"
            :disabled-date="item.disabledDate === undefined ? () => false : item.disabledDate"
            :show-time="item.showTime||false"
          />
        </template>
        <template v-if="item.type==='range'">
          <a-range-picker
            v-model="myform[item.name]"
            :value-format="item.valueFormat || 'yyyy-MM-DD'"
            :show-time="item.showTime || false"
            :disabled-time="item.disabledTime === undefined ? () => false : item.disabledTime"
          />
        </template>
        <!--数字输入框-->
        <template v-if="item.type==='number'">
          <a-input-number
            v-model="myform[item.name]"
            :min="item.min"
            :max="item.max"
            :step="item.step || 1"
            :formatter="item.formatter === undefined ? value => value : item.formatter"
            :parser="item.parser === undefined ? value => value : item.parser"
          />
        </template>

        <!--单选项-->
        <template v-if="item.type==='radio'">
          <a-radio-group
            v-model="myform[item.name]"
            :options="item.option"
          />
        </template>

        <!--多选项-->
        <template v-if="item.type==='checked'">
          <MyChecked
            ref="formChild"
            :value.sync="myform[item.name]"
            :options="item.option"
          />
        </template>

      </a-form-model-item>

      <!--自定义输入框-->
      <template v-if="item.type==='custom'">
        <a-form-model-item :key="i" :label="item.label">
          <div
            v-for="(items, k) in myform[item.name]"
            :key="k"
            class="d-flex justify-content-between align-items-center u-p-t-4 u-m-b-11"
          >
            <a-input
              v-model="items.value"
              :placeholder="item.placeholder || `请输入${item.label}`"
              autocomplete="off"
            />
            <a-button v-if="k === 0" type="link" @click="onCustomAdd(item.name)">
              <a-icon type="plus-circle"/>
            </a-button>
            <a-button v-else type="link" @click="onCustomDel(item.name, items.id)">
              <a-icon type="minus-circle" class="text-danger"/>
            </a-button>
          </div>
        </a-form-model-item>
      </template>

      <!--如果有子级-->
      <template v-if="item.children">
        <MyFormItem
          v-for="items in item.children"
          v-show="items.rel.includes(myform[item.name])"
          ref="formChild"
          :key="items.name"
          :item="items"
          :label-col="labelCol"
        />
      </template>
    </template>

    <a-form-model-item :wrapper-col="{span:12,offset:5}">
      <a-button type="primary" html-type="submit">{{submitText}}</a-button>
      <a-button type="default" class="ml-5" @click="onResetForm">{{resetText}}</a-button>
    </a-form-model-item>
  </a-form-model>
</template>

<script>
  import MyFormItem from '~/components/MyFormItem'
  import { guid } from '~/assets/js/utils'

  export default {
    name: 'MyBaseForm',
    components: { MyFormItem },
    props: {
      labelCol: {
        type: Number,
        default: 5
      },
      submitText: {
        type: String,
        default: '提交'
      },
      resetText: {
        type: String,
        default: '重置'
      },
      itemList: {
        type: Array,
        default () {
          return []
        }
      },
      rules: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    data () {
      return {
        myform: {}
      }
    },
    mounted () {
      for (const i in this.itemList) {
        const { type, name } = this.itemList[i]
        let val = ''
        if (type === 'select') {
          val = undefined
        }
        if (['range', 'checked'].includes(type)) {
          val = []
        }
        if (['custom'].includes(type)) {
          val = [{ id: guid(), value: '' }]
        }
        this.$set(this.myform, name, val)
      }
    },
    methods: {
      submitSave () {
        this.$refs.myform.validate(valid => {
          if (valid) {
            const data = this.$lodash.cloneDeep(this.myform)
            for (const key in data) {
              if (data[key] === undefined) {
                data[key] = ''
              }
              if (Object.prototype.toString.call(data[key]) === '[object Array]') {
                data[key] = data[key].join(',')
              }
            }
            console.log(data)
            this.$emit('onSubmit', data)
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      onResetForm () {
        this.$refs.myform.resetFields()
        const refsArr = this.$refs.formChild
        if (refsArr !== undefined) {
          refsArr.forEach(item => {
            item.resetFields()
          })
        }
      },
      filterOption (input, option) {
        return (
          option.componentOptions.children[0].text.toLowerCase().includes(input.toLowerCase())
        )
      },
      // 添加自定义
      onCustomAdd (name) {
        this.myform[name].push({ id: guid(), value: '' })
      },
      onCustomDel (name, id) {
        const arr = this.$lodash.cloneDeep(this.myform[name])
        this.$lodash.remove(arr, o => o.id === id)
        this.myform[name] = arr
      }
    }
  }
</script>

<style scoped>

</style>
