<template>
    <a-form
            v-if="!loading"
            :form="form"
            :label-col="{ span: labelCol }"
            :wrapper-col="{ span: wrapperCol }"
            @submit.prevent="handleSubmit"
    >
        <a-form-item
                v-for="(item, i) in itemList"
                :key="i"
                :label="item.label"
                :extra="item.extra||''"
        >
            <!--文本框||文本域-->
            <a-input
                    v-if="item.type===undefined || item.type==='text' || item.type==='textarea'"
                    v-decorator="[item.name, { initialValue: '', rules: item.rules }]"
                    :type="item.type || 'text'"
                    :placeholder="item.placeholder || ''"
                    :allow-clear="item.type!=='textarea'"
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
            <!--选择项-->
            <a-select
                    v-if="item.type==='select'"
                    v-decorator="[item.name, { initialValue: item.mode === undefined || item.mode === 'default' ? undefined : [], rules: item.rules }]"
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
                    v-decorator="[item.name, { initialValue: '', rules: item.rules }]"
                    :value-format="item.format || 'yyyy-MM-DD'"
                    :format="item.format || 'yyyy-MM-DD'"
                    :placeholder="item.placeholder || ''"
                    :input-read-only="true"
                    :disabled-date="item.disabledDate === undefined ? () => false : item.disabledDate"
                    :show-time="item.showTime||false"
            />
            <a-range-picker
                    v-if="item.type==='range'"
                    v-decorator="[item.name, { initialValue: [], rules: item.rules }]"
                    :value-format="item.valueFormat || 'yyyy-MM-DD'"
                    :show-time="item.showTime || false"
                    :disabled-time="item.disabledTime === undefined ? () => false : item.disabledTime"
            />
            <!--数字输入框-->
            <a-input-number
                    v-if="item.type==='number'"
                    v-decorator="[item.name, { initialValue: '', rules: item.rules }]"
                    :min="item.min"
                    :max="item.max"
                    :step="item.step || 1"
                    :formatter="item.formatter === undefined ? value => value : item.formatter"
                    :parser="item.parser === undefined ? value => value : item.parser"
            />
            <!--单选项-->
            <a-radio-group
                    v-if="item.type==='radio'"
                    v-decorator="[item.name, { initialValue: '', rules: item.rules }]"
                    :options="item.option"
            />
            <!--多选项-->
            <a-checkbox-group
                    v-if="item.type==='checkbox'"
                    v-decorator="[item.name, { initialValue: [], rules: item.rules }]"
                    :options="item.option"
            />

        </a-form-item>
        <!--提交按钮-->
        <a-form-item :wrapper-col="{ span: wrapperCol, offset: labelCol }">
            <a-button type="primary" html-type="submit">保存</a-button>
            <a-button type="default" class="ml-5">重置</a-button>
        </a-form-item>
    </a-form>
</template>

<script>
  export default {
    name: 'MyForm',
    props: {
      labelCol: {
        type: Number,
        default: 5
      },
      wrapperCol: {
        type: Number,
        default: 12
      },
      itemList: {
        type: Array,
        default () {
          return []
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
      filterOption (input, option) {
        return (
          option.componentOptions.children[0].text.toLowerCase().includes(input.toLowerCase())
        )
      }
    }
  }
</script>

<style scoped>

</style>
