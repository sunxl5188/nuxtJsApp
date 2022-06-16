<template>
  <a-row>
    <!--<a-form-model
          ref="myform"
          layout="horizontal"
          :model="myform"
          :rules="rules"
          :label-col="{span:5}"
          :wrapper-col="{span:12}"
          @submit.prevent="submitSave"
        >
      <a-form-model-item label="用户名" prop="name">
        <a-input v-model="myform.name" placeholder="请输入" />
      </a-form-model-item>

      <a-form-model-item :wrapper-col="{span:12,offset:5}">
        <a-button type="primary" html-type="submit">
          提交
        </a-button>
      </a-form-model-item>
    </a-form-model>-->
    <a-form-model
      ref="myform"
      layout="horizontal"
      :model="myform"
      :label-col="{span:labelCol}"
      :wrapper-col="{span:24-labelCol}"
      @submit.prevent="submitSave"
    >
      <a-col
        v-for="(item, index) in itemList" :key="item.name+index" :xs="24" :sm="12" :md="8" :lg="8" :xl="6"
        :xxl="4">
        <a-form-model-item :label="item.label">
          <!--文本-->
          <template v-if="item.type===undefined || item.type==='text'">
            <a-input v-model="myform[item.name]" :placeholder="item.placeholder || `请输入${item.label}`"/>
          </template>
          <!--选择-->
          <template v-else-if="item.type === 'select'">
            <a-select
              v-model="myform[item.name]" :placeholder="item.placeholder || `请输入${item.label}`"
              allow-clear
              :mode="item.mode || 'default'"
            >
              <a-select-option v-for="(d, n) in item.option" :key="d.value.toString() + n" :value="d.value">
                {{d.label}}
              </a-select-option>
            </a-select>
          </template>
          <!--日历-->
          <template v-else-if="item.type==='date'">
            <a-date-picker
              v-model="myform[item.name]"
              :format="item.valueFormat || 'yyyy-MM-DD HH:mm:ss'"
              :value-format="item.valueFormat || 'yyyy-MM-DD HH:mm:ss'"
              :placeholder="item.placeholder || `请输入${item.label}`"
              :mode="item.mode||'date'"
              :input-read-only="true"
            />
          </template>
          <!--日期范围-->
          <template v-else-if="item.type === 'range'">

          </template>
        </a-form-model-item>
      </a-col>
    </a-form-model>
  </a-row>
</template>

<script>
  export default {
    name: 'SearchFilter',
    props: {
      itemList: {
        type: Array,
        default () {
          return []
        }
      },
      labelCol: {
        type: Number,
        default: 6
      }
    },
    data () {
      return {
        myform: {}
      }
    },
    mounted () {
      for (const i in this.itemList) {
        const val = this.itemList[i].type === 'select' ? undefined : ''
        this.$set(this.myform, this.itemList[i].name, val)
      }
    },
    methods: {
      submitSave () {}
    }
  }
</script>

<style scoped lang="scss">
  .ant-form-item {
    margin-bottom: 10px;
  }

  .ant-calendar-picker {
    width: 100%;
  }
</style>
