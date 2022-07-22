<template>
    <div>
        <MyLoading :loading="loading"></MyLoading>
        <a-form
                v-if="!loading"
                layout="vertical"
                :form="form"
        >
            <a-row :gutter="24">
                <a-col v-for="(item, idx) in itemList" :key="idx" :span="24 / columnsLen">
                    <a-form-item :label="item.label">
                        <slot :name="item.name">
                            <!--文本框||文本域-->
                            <a-input
                                    v-if="item.type===undefined || item.type==='text' || item.type==='textarea'"
                                    v-decorator="[item.name, { initialValue: dataSource[item.name] || '', rules: item.rules }]"
                                    :type="item.type || 'text'"
                                    :placeholder="item.placeholder || ''"
                                    :allow-clear="item.type!=='textarea'"
                                    :auto-size="{ minRows: 3, maxRows: 6 }"
                            >
                                <!--带标签的 input，设置前置标签-->

                                <span v-if="item.addonBefore" slot="addonBefore">
                                    <slot :name="item.name+'_addonBefore'">
                                        <a-select
                                                v-if="item.addonBefore.option"
                                                v-decorator="[item.addonBefore.name, { initialValue: item.addonBefore.option[0].value }]"
                                                :dropdown-match-select-width="false"
                                                :options="item.addonBefore.option"
                                        />
                                    </slot>
                                </span>

                                <!--带标签的 input，设置后置标签-->
                                <span v-if="item.addonAfter" slot="addonAfter">
                                    <slot :name="item.name+'_addonAfter'">
                                    <a-select
                                            v-if="item.addonAfter.option"
                                            v-decorator="[item.addonAfter.name, { initialValue: item.addonAfter.option[0].value }]"
                                            :dropdown-match-select-width="false"
                                            :options="item.addonAfter.option"
                                    />
                                    </slot>
                                </span>
                                <!--带有前缀图标的 input-->
                                <template v-if="item.prefix" #prefix>
                                    <slot :name="item.name+'_prefix'">
                                        <a-icon type="user"/>
                                    </slot>
                                </template>
                                <!--带有后缀图标的 input-->
                                <template v-if="item.suffix" #suffix>
                                    <slot :name="item.name+'_suffix'">
                                        <a-tooltip
                                                v-if="item.suffix" slot="suffix" placement="top" :title="item.suffix"
                                                arrow-point-at-center>
                                            <a-icon type="question-circle"/>
                                        </a-tooltip>
                                    </slot>
                                </template>
                            </a-input>
                            <!--选择项-->
                            <a-select
                                    v-if="item.type==='select'"
                                    v-decorator="[item.name,
                    {
                      initialValue: dataSource[item.name] || (item.mode === undefined || item.mode === 'default' ? undefined : []),
                      rules: item.rules
                    }]"
                                    :placeholder="item.placeholder || ''"
                                    allow-clear
                                    :mode="item.mode || 'default'"
                                    show-search
                                    :max-tag-count="2"
                                    option-filter-prop="children"
                                    :filter-option="filterOption"
                            >
                                <a-select-option
                                        v-for="(items, index) of item.option" :key="(index + 9).toString(36) + index"
                                        :value="(items.value).toString()">
                                    {{items.label}}
                                </a-select-option>
                            </a-select>
                            <!--日历 date-->
                            <a-date-picker
                                    v-if="item.type === 'date'"
                                    v-decorator="[item.name, { initialValue: dataSource[item.name] || '', rules: item.rules }]"
                                    :value-format="item.format || 'yyyy-MM-DD'"
                                    :format="item.format || 'yyyy-MM-DD'"
                                    :placeholder="item.placeholder || ''"
                                    :input-read-only="true"
                                    :disabled-date="item.disabledDate === undefined ? () => false : item.disabledDate"
                                    :show-time="item.showTime||false"
                            />
                            <a-range-picker
                                    v-if="item.type==='range'"
                                    v-decorator="[item.name, { initialValue: dataSource[item.name] || [], rules: item.rules }]"
                                    :value-format="item.valueFormat || 'yyyy-MM-DD'"
                                    :show-time="item.showTime || false"
                                    :disabled-time="item.disabledTime === undefined ? () => false : item.disabledTime"
                            />
                            <!--数字输入框-->
                            <a-input-number
                                    v-if="item.type==='number'"
                                    v-decorator="[item.name, { initialValue: dataSource[item.name] || '', rules: item.rules }]"
                                    :min="item.min || 0"
                                    :max="item.max || 'Infinity'"
                                    :step="item.step || 1"
                                    :formatter="item.formatter === undefined ? value => value : item.formatter"
                                    :parser="item.parser === undefined ? value => value : item.parser"
                            />
                            <!--单选项-->
                            <a-radio-group
                                    v-if="item.type==='radio'"
                                    v-decorator="[item.name, { initialValue: dataSource[item.name] || '', rules: item.rules }]"
                                    :options="item.option"
                            />
                            <!--多选项-->
                            <a-checkbox-group
                                    v-if="item.type==='checkbox'"
                                    v-decorator="[item.name, { initialValue: dataSource[item.name] || [], rules: item.rules }]"
                                    :options="item.option"
                            />
                        </slot>
                    </a-form-item>
                </a-col>
            </a-row>
        </a-form>
    </div>
</template>

<script>
  export default {
    name: 'MyFormRow',
    props: {
      columnsLen: {
        type: Number,
        default: 3
      },
      itemList: {
        type: Array,
        default () {
          return []
        }
      },
      dataSource: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    data () {
      return {
        loading: true,
        form: this.$form.createForm(this)
      }
    },
    mounted () {
      this.$nextTick(() => {
        this.loading = false
      })
    },
    methods: {
      handleSubmit () {
        this.form.validateFields((err, values) => {
          if (!err) {
            for (const i in values) {
              if (Object.prototype.toString.call(values[i]) === '[object Array]') {
                values[i] = JSON.stringify(values[i])
              }
            }
            this.$emit('onSubmit', values)
          } else {
            console.log(err)
          }
        })
      },
      handleReset () {
        this.form.resetFields()
      },
      filterOption (input, option) {
        return (
          option.componentOptions.children[0].text.toLowerCase().includes(input.toLowerCase())
        )
      }
    }
  }
</script>

<style scoped lang="scss">
    ::v-deep {
        .ant-calendar-picker, .ant-input-number {
            width: 100%;
        }
    }
</style>
