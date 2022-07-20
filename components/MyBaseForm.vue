<template>
    <a-form-model
            ref="myform"
            layout="horizontal"
            :model="myform"
            :rules="rules"
            :label-col="{span:labelCol}"
            :wrapper-col="{span:wrapperCol}"
            @submit.prevent="submitSave"
    >
        <template v-for="(item, i) in itemList">
            <a-form-model-item
                    v-if="item.type!=='custom'"
                    :key="i"
                    :label="item.label"
                    :prop="item.name"
            >
                <!--文本框||文本域-->
                <a-input
                        v-if="item.type === undefined || item.type === 'text'|| item.type==='textarea'"
                        v-model="myform[item.name]"
                        :type="item.type || 'text'"
                        :placeholder="item.placeholder || `请输入${item.label}`"
                        :allow-clear="item.type!=='textarea'"
                        autocomplete="off"
                        :auto-size="{ minRows: 3, maxRows: 6 }"
                >
                    <!--带标签的 input，设置前置标签-->
                    <a-select
                            v-if="item.addonBefore"
                            slot="addonBefore"
                            v-decorator="[item.addonBefore.name, { initialValue: item.addonBefore.option[0].value }]"
                            :options="item.addonBefore.option"
                    />
                    <!--带标签的 input，设置后置标签-->
                    <a-select
                            v-if="item.addonAfter"
                            slot="addonAfter"
                            v-decorator="[item.addonAfter.name, { initialValue: item.addonAfter.option[0].value }]"
                            :options="item.addonAfter.option"
                    />
                    <!--带有前缀图标的 input-->
                    <template v-if="item.prefix" #prefix>
                        <slot :name="item.name+'_prefix'">
                            <a-icon type="user" />
                        </slot>
                    </template>
                    <!--带有后缀图标的 input-->
                    <template v-if="item.suffix" #suffix>
                        <slot :name="item.name+'_suffix'">
                            <a-tooltip v-if="item.suffix" slot="suffix" placement="top" :title="item.suffix" arrow-point-at-center>
                                <a-icon type="question-circle" />
                            </a-tooltip>
                        </slot>
                    </template>
                </a-input>

                <!--密码框-->
                <a-input-password
                        v-if="item.type === 'password'"
                        v-decorator="[item.name, { initialValue: '', rules: item.rules }]"
                        :placeholder="item.placeholder || ''"
                        allow-clear
                />
                <!--选择框-->
                <a-select
                        v-if="item.type==='select'"
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
                <!--日期选择-->
                <a-date-picker
                        v-if="item.type === 'date'"
                        v-model="myform[item.name]"
                        :value-format="item.format || 'yyyy-MM-DD'"
                        :format="item.format || 'yyyy-MM-DD'"
                        :placeholder="item.placeholder || `请输入${item.label}`"
                        :input-read-only="true"
                        :disabled-date="item.disabledDate === undefined ? () => false : item.disabledDate"
                        :show-time="item.showTime||false"
                />
                <a-range-picker
                        v-if="item.type==='range'"
                        v-model="myform[item.name]"
                        :value-format="item.valueFormat || 'yyyy-MM-DD'"
                        :show-time="item.showTime || false"
                        :disabled-time="item.disabledTime === undefined ? () => false : item.disabledTime"
                />
                <!--数字输入框-->
                <a-input-number
                        v-if="item.type==='number'"
                        v-model="myform[item.name]"
                        :min="item.min"
                        :max="item.max"
                        :step="item.step || 1"
                        :formatter="item.formatter === undefined ? value => value : item.formatter"
                        :parser="item.parser === undefined ? value => value : item.parser"
                />
                <!--单选项-->
                <a-radio-group
                        v-if="item.type==='radio'"
                        v-model="myform[item.name]"
                        :options="item.option"
                />
                <!--多选项-->
                <a-checkbox-group
                        v-if="item.type==='checkbox'"
                        v-model="myform[item.name]"
                        :options="item.option"
                />
            </a-form-model-item>

            <!--自定义输入框-->
            <div v-if="item.type==='custom'" :key="i">
                <a-form-model-item
                        v-for="(items, index) in myform[item.name]"
                        :key="index"
                        :label="item.label+numToHan[index]"
                        :prop="item.name+'.'+index+'.value'"
                        :rules="item.rules || {}"
                        class="custom-list"
                >
                    <div class="d-flex justify-content-between align-items-center u-p-t-4">
                        <a-input
                                v-model="items.value"
                                :placeholder="item.placeholder || `请输入${item.label}`"
                                autocomplete="off"
                        />
                        <a-button v-if="index === 0" type="link" @click="onCustomAdd(item.name)">
                            <a-icon type="plus-circle"/>
                        </a-button>
                        <a-button v-else type="link" @click="onCustomDel(item.name, items.id)">
                            <a-icon type="minus-circle" class="text-danger"/>
                        </a-button>
                    </div>
                </a-form-model-item>
            </div>

            <!--如果有子级**************************************************************-->
            <template v-if="item.children">
                <a-form-model-item
                        v-for="items in item.children"
                        v-show="items.rel.includes(myform[item.name])"
                        :key="items.name"
                        :label="items.label||'没有名称'"
                        :prop="items.name"
                        :label-col="{span:labelCol}"
                        :wrapper-col="{span:wrapperCol}"
                        :class="{labelHidden: items.label === ''}"
                >
                    <!--文本框 || 文本域-->
                    <a-input
                            v-if="items.type === undefined || items.type === 'text' || items.type==='textarea'"
                            v-model="myform[items.name]"
                            :type="item.type || 'text'"
                            :placeholder="items.placeholder || `请输入${items.label}`"
                            autocomplete="off"
                            :auto-size="{ minRows: 3, maxRows: 6 }"
                    />

                    <!--选择框-->
                    <a-select
                            v-if="items.type==='select'"
                            v-model="myform[items.name]"
                            show-search
                            option-filter-prop="children"
                            :filter-option="filterOption"
                            :mode="items.multiple||'default'"
                    >
                        <a-select-option v-for="it of items.option" :key="it.value" :value="it.value">
                            {{it.label}}
                        </a-select-option>
                    </a-select>
                    <!--日期选择-->
                    <a-date-picker
                            v-if="items.type === 'date'"
                            v-model="myform[items.name]"
                            :value-format="items.format || 'yyyy-MM-DD'"
                            :format="items.format || 'yyyy-MM-DD'"
                            :placeholder="items.placeholder || `请输入${items.label}`"
                            :input-read-only="true"
                            :disabled-date="items.disabledDate === undefined ? () => false : items.disabledDate"
                            :show-time="items.showTime||false"
                    />
                    <a-range-picker
                            v-if="items.type==='range'"
                            v-model="myform[items.name]"
                            :value-format="items.valueFormat || 'yyyy-MM-DD'"
                            :show-time="items.showTime || false"
                            :disabled-time="items.disabledTime === undefined ? () => false : items.disabledTime"
                    />

                    <!--数字输入框-->
                    <a-input-number
                            v-if="items.type==='number'"
                            v-model="myform[items.name]"
                            :min="items.min"
                            :max="items.max"
                            :step="items.step || 1"
                            :formatter="items.formatter === undefined ? value => value : items.formatter"
                            :parser="items.parser === undefined ? value => value : items.parser"
                    />
                </a-form-model-item>
            </template>
        </template>

        <a-form-model-item :wrapper-col="{span:12,offset:5}">
            <a-button type="primary" html-type="submit">{{submitText}}</a-button>
            <a-button type="default" class="ml-5" @click="onResetForm">{{resetText}}</a-button>
        </a-form-model-item>
    </a-form-model>
</template>

<script>
  import { guid } from '~/assets/js/utils'

  const numToHan = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十']

  export default {
    name: 'MyBaseForm',
    props: {
      labelCol: {
        type: Number,
        default: 5
      },
      wrapperCol: {
        type: Number,
        default: 10
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
        myform: {},
        numToHan
      }
    },
    mounted () {
      for (const i in this.itemList) {
        const { type, name, children } = this.itemList[i]
        let val = ''
        if (type === 'select') {
          val = undefined
        }
        if (['range', 'checkbox'].includes(type)) {
          val = []
        }
        if (['custom'].includes(type)) {
          val = [{ id: guid(), value: '' }]
        }
        if (type === 'radio' && children.length > 0) {
          children.forEach(item => {
            this.$set(this.myform, item.name, '')
          })
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
              if (Object.prototype.hasOwnProperty.call(data, key)) {
                if (data[key] === undefined) {
                  data[key] = ''
                }
                if (Object.prototype.toString.call(data[key]) === '[object Array]') {
                  data[key] = JSON.stringify(data[key])
                }
              }
            }
            this.$emit('onSubmit', data)
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      onResetForm () {
        this.$refs.myform.resetFields()
      },
      filterOption (input, option) {
        return (
          option.componentOptions.children[0].text.toLowerCase().includes(input.toLowerCase())
        )
      },
      // 添加自定义
      onCustomAdd (name) {
        if (this.myform[name].length >= 10) {
          this.$error({ title: '自定义字段最多添十个' })
        } else {
          this.myform[name].push({
            id: guid(),
            value: ''
          })
        }
      },
      onCustomDel (name, id) {
        const arr = this.$lodash.cloneDeep(this.myform[name])
        this.$lodash.remove(arr, o => o.id === id)
        this.myform[name] = arr
      }
    }
  }
</script>

<style scoped lang="scss">
    .custom-list {
        margin-bottom: 5px;

        &:last-child {
            margin-bottom: 24px;
        }

    }

    .labelHidden {
        &::v-deep .ant-form-item-label {
            label {
                display: none;
            }
        }
    }

    .w-90 {
        width: 90%;
    }
</style>
