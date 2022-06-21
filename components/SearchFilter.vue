<template>
  <div>
    <MyLoading :visible="loading" />
    <a-form-model
      v-if="!loading"
      ref="myform"
      layout="horizontal"
      :model="myform"
      :label-col="{span:labelCol}"
      :wrapper-col="{span:24-labelCol}"
      @submit.prevent="submitSave"
    >
      <div
        class="searchWrap"
        :style="searchFold ? `height:${collHeight}px` : clientWidth < 576 ? 'height:79px':'height:50px'"
      >
        <a-row>
          <a-col
            v-for="(item, index) in itemList"
            :key="item.name+index"
            :xs="24"
            :sm="12"
            :md="8"
            :lg="8"
            :xl="6"
            :xxl="4"
          >
            <a-form-model-item :label="item.label" :prop="item.name">
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
        </a-row>
      </div>
      <a-row>
        <a-col :span="24" class="d-flex justify-content-end">
          <a-space align="center" direction="horizontal" size="large">
            <a-button type="primary" ghost html-type="submit">搜索</a-button>
            <a-button type="default" @click="onClear">清空</a-button>
            <a-button type="link" @click="onClickOpen">
              {{searchFold?'收起':'展开'}}
              <i class="iconfont">{{searchFold?'&#xe745;':'&#xe7b2;'}}</i>
            </a-button>
          </a-space>
        </a-col>
      </a-row>
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
        myform: {},
        collHeight: 0,
        clientWidth: 1000
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
      ['load', 'resize'].forEach(item => {
        window.addEventListener(item, this.calculation)
      })

      this.$nextTick(() => {
        this.loading = false
      })
    },
    methods: {
      calculation () {
        const clientWidth = document.body.clientWidth
        const len = this.itemList.length
        // <576, ≥576,≥768,≥992,≥1200,≥1600
        // console.log(clientWidth)
        this.clientWidth = clientWidth
        if (clientWidth < 576) {
          this.collHeight = len * 79
        }
        if (clientWidth >= 576) {
          this.collHeight = Math.ceil(len / 2) * 50
        }
        if (clientWidth >= 768) {
          this.collHeight = Math.ceil(len / 3) * 50
        }
        if (clientWidth >= 992) {
          this.collHeight = Math.ceil(len / 3) * 50
        }
        if (clientWidth >= 1200) {
          this.collHeight = Math.ceil(len / 4) * 50
        }
        if (clientWidth >= 1600) {
          this.collHeight = Math.ceil(len / 6) * 50
        }
      },
      onClickOpen () {
        this.$vuexAdmin('searchFold', !this.searchFold)
      },
      submitSave () {
        const data = this.$lodash.cloneDeep(this.myform)
        for (const key in data) {
          if (data[key] === undefined) {
            data[key] = ''
          }
          if (Object.prototype.toString.call(data[key]) === '[object Array]') {
            data[key] = data[key].join(',')
          }
        }
        this.$emit('onSearch', data)
      },
      onClear(){
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
    height: 0;
    overflow: hidden;
    -webkit-transition: all .3s ease 0s;
    -moz-transition: all .3s ease 0s;
    -ms-transition: all .3s ease 0s;
    transition: all .3s ease 0s;
  }
</style>
