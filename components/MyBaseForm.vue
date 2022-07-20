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
                <!--文本输入框-->
                <template v-if="item.type === undefined || item.type === 'text'">
                    <a-input
                            v-model="myform[item.name]"
                            :placeholder="item.placeholder || `请输入${item.label}`"
                            allow-clear
                            autocomplete="off"
                            class="w-90"
                    />
                </template>
                <!--密码输入框-->
                <template v-if="item.type === 'password'">
                    <a-input
                            v-model="myform[item.name]" type="password"
                            :placeholder="item.placeholder || `请输入${item.label}`"
                            autocomplete="off"
                            class="w-90"
                    />
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
                            class="w-90"
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
                            class="w-90"
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
                <template v-if="item.type==='checkbox'">
                    <a-checkbox-group
                            v-model="myform[item.name]"
                            :options="item.option"
                    />
                </template>
                <slot :name="item.name+'_question'" :row="item.question">
                    <a-tooltip v-if="item.question" placement="top" :title="item.question" arrow-point-at-center>
                        <a-icon type="question-circle" class="u-m-l-5 text-muted" style="cursor:pointer;"/>
                    </a-tooltip>
                </slot>
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
                    <!--文本输入框-->
                    <template v-if="items.type === undefined || items.type === 'text'">
                        <a-input
                                v-model="myform[items.name]"
                                :placeholder="items.placeholder || `请输入${items.label}`"
                                autocomplete="off"
                        />
                    </template>
                    <!--选择框-->
                    <template v-if="items.type==='select'">
                        <a-select
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
                    </template>
                    <!--文本域-->
                    <template v-if="items.type==='textarea'">
                        <a-input
                                v-model="myform[items.name]"
                                type="textarea"
                                :placeholder="items.placeholder || `请输入${items.label}`"
                                :auto-size="{ minRows: 3, maxRows: 6 }"
                        />
                    </template>
                    <!--日期选择-->
                    <template v-if="items.type === 'date'">
                        <a-date-picker
                                v-model="myform[items.name]"
                                :value-format="items.format || 'yyyy-MM-DD'"
                                :format="items.format || 'yyyy-MM-DD'"
                                :placeholder="items.placeholder || `请输入${items.label}`"
                                :input-read-only="true"
                                :disabled-date="items.disabledDate === undefined ? () => false : items.disabledDate"
                                :show-time="items.showTime||false"
                        />
                    </template>
                    <template v-if="items.type==='range'">
                        <a-range-picker
                                v-model="myform[items.name]"
                                :value-format="items.valueFormat || 'yyyy-MM-DD'"
                                :show-time="items.showTime || false"
                                :disabled-time="items.disabledTime === undefined ? () => false : items.disabledTime"
                        />
                    </template>
                    <!--数字输入框-->
                    <template v-if="items.type==='number'">
                        <a-input-number
                                v-model="myform[items.name]"
                                :min="items.min"
                                :max="items.max"
                                :step="items.step || 1"
                                :formatter="items.formatter === undefined ? value => value : items.formatter"
                                :parser="items.parser === undefined ? value => value : items.parser"
                        />
                    </template>

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
