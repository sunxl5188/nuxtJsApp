<template>
    <div>
        <MyLoading :visible="loading"/>
        <a-form-model
                v-if="!loading"
                ref="myform"
                layout="horizontal"
                :model="myform"
                :label-col="{span:labelCol}"
                :wrapper-col="{span:24-labelCol}"
                @submit.prevent="submitSave"
        >
            <div class="searchWrap" :class="{'d-flex justify-content-between align-items-start': !searchFold}">
                <a-row class="flex-fill">
                    <template v-for="(item, index) in itemList">
                        <a-col
                                v-if="index < lens "
                                :key="item.name+index"
                                :span="8"
                        >
                            <a-form-model-item :label="item.label" :prop="item.name">
                                <!--文本-->
                                <template v-if="item.type===undefined || item.type==='text'">
                                    <a-input
                                            v-model="myform[item.name]"
                                             :placeholder="item.placeholder || `请输入${item.label}`"
                                    />
                                </template>
                                <!--选择-->
                                <template v-else-if="item.type === 'select'">
                                    <a-select
                                            v-model="myform[item.name]"
                                            :placeholder="item.placeholder || `请输入${item.label}`"
                                            allow-clear
                                            :mode="item.mode || 'default'"
                                    >
                                        <a-select-option
                                                v-for="(d, n) in item.option"
                                                :key="d.value.toString() + n"
                                                :value="d.value">
                                            {{d.label}}
                                        </a-select-option>
                                    </a-select>
                                </template>
                                <!--日历-->
                                <template v-else-if="item.type==='date'">
                                    <a-date-picker
                                            v-model="myform[item.name]"
                                            :format="item.valueFormat || 'yyyy-MM-DD'"
                                            :value-format="item.valueFormat || 'yyyy-MM-DD'"
                                            :placeholder="item.placeholder || `请输入${item.label}`"
                                            :input-read-only="true"
                                            :disabled-date="item.disabledDate === undefined ? () => false : item.disabledDate"
                                            :show-time="item.showTime||false"
                                    />
                                </template>
                                <!--日期范围-->
                                <template v-else-if="item.type === 'range'">
                                    <a-range-picker
                                            v-model="myform[item.name]"
                                            class="w-100"
                                            :value-format="item.valueFormat || 'yyyy-MM-DD'"
                                            :show-time="item.showTime || false"
                                            :disabled-time="item.disabledTime === undefined ? () => false : item.disabledTime"
                                    />
                                </template>
                            </a-form-model-item>
                        </a-col>
                    </template>
                </a-row>
                <a-row>
                    <a-col :span="24">
                        <div class="d-flex justify-content-end" :class="!searchFold?'u-p-t-4 ml-4':''">
                            <a-button type="primary" class="mr-3" ghost html-type="submit">搜索</a-button>
                            <a-button type="default" class="mr-3" @click="onClear">清空</a-button>
                            <a-button type="link" @click="onClickOpen">
                                {{searchFold?'收起':'展开'}}
                                <i class="iconfont">{{searchFold?'&#xe745;':'&#xe7b2;'}}</i>
                            </a-button>
                        </div>
                    </a-col>
                </a-row>
            </div>
        </a-form-model>
    </div>
</template>

<script>
  /*
  disabledDate(d){
        const startDate = this.$moment('2020').startOf('year')
        const endDate = this.$moment('2025').endOf('year')
        return d < startDate || d > endDate
      }
   */
  import MyLoading from '~/components/MyLoading'

  export default {
    name: 'SearchFilter',
    components: { MyLoading },
    props: {
      itemList: {
        type: Array,
        default () {
          return []
        }
      },
      labelCol: {
        type: Number,
        default: 8
      }
    },
    data () {
      return {
        loading: true,
        myform: {}
      }
    },
    computed: {
      lens () {
        let len = 0
        if (this.searchFold) {
          len = this.itemList.length
        } else {
          len = 3
        }
        return len
      }
    },
    mounted () {
      for (const i in this.itemList) {
        const { type, name } = this.itemList[i]
        let val = ''
        if (type === 'select') {
          val = undefined
        } else if (type === 'range') {
          val = []
        } else {
          val = ''
        }
        this.$set(this.myform, name, val)
      }

      this.$nextTick(() => {
        this.loading = false
      })
    },
    methods: {
      onClickOpen () {
        this.$vuexAdmin('searchFold', !this.searchFold)
      },
      submitSave () {
        const data = this.$lodash.cloneDeep(this.myform)
        for (const key in data) {
          if (Object.prototype.hasOwnProperty.call(data, key)) {
            if (data[key] === undefined) {
              data[key] = ''
            }
            if (Object.prototype.toString.call(data[key]) === '[object Array]') {
              data[key] = data[key].join(',')
            }
          }
        }
        this.$emit('onSearch', data)
      },
      onClear () {
        this.$refs.myform.resetFields()
        this.submitSave()
      }
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

    .searchWrap {

    }
</style>
