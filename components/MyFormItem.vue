<template>
  <a-form-model-item
    label=""
    :prop="item.name"
    :label-col="{span:labelCol}"
    :wrapper-col="{span:24-labelCol, offset: labelCol}"
  >
    <div v-if="item.label">{{item.label}}：</div>
    <!--文本输入框-->
    <template v-if="item.type === undefined || item.type === 'text'">
      <a-input v-model="myform[item.name]" :placeholder="item.placeholder || `请输入${item.label}`" autocomplete="off"/>
    </template>
    <!--选择框-->
    <template v-if="item.type==='select'">
      <a-select
        v-model="myform[item.name]"
        show-search
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

  </a-form-model-item>
</template>

<script>
  export default {
    name: 'MyFormItem',
    props: {
      item: {
        type: Object,
        default: () => {}
      },
      labelCol: {
        type: Number,
        default: 5
      }
    },
    data () {
      return {
        myform: {}
      }
    },
    watch: {
      myform: {
        handler (val) {
          this.$emit('update:value', val[this.item.name])
        },
        deep: true
      }
    },
    mounted () {
      this.$set(this.myform, this.item.name, '')
    },
    methods: {
      filterOption (input, option) {
        // console.log(input, option)
        return (
          option.componentOptions.children[0].text.toLowerCase().includes(input.toLowerCase())
        )
      },
      resetFields () {
        this.myform[this.item.name] = ''
      }
    }
  }
</script>

<style scoped lang="scss">
  ::v-deep .ant-form-item-children {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    & > input {
      flex: 1;
    }
  }
</style>
