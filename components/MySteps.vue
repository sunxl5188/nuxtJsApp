<template>
  <div>
    <template v-if="dotTips">
      <a-steps :current="current" :direction="direction" :size="size">
        <a-popover slot="progressDot" slot-scope="{ index, status, prefixCls }">
          <template slot="content">
            <span>第 {{ index + 1 }} 步 状态: {{ getStatus(status) }} </span>
          </template>
          <span :class="`${prefixCls}-icon-dot`"/>
        </a-popover>
        <a-step
          v-for="(item, i) in stepList"
          :key="i"
          :status="item.status || ''"
          :title="item.title"
          :description="item.description"
        />
      </a-steps>
    </template>
    <template v-else>
      <a-steps :current="current" :direction="direction" :size="size" :progress-dot="progressDot">
        <a-step
          v-for="(item, i) in stepList"
          :key="i"
          :status="item.status || ''"
          :title="item.title"
          :description="item.description"
        >
          <a-icon v-if="item.icon" slot="icon" :type="item.icon"/>
        </a-step>
      </a-steps>
    </template>
  </div>
</template>

<script>
  export default {
    name: 'MySteps',
    props: {
      current: {
        type: Number,
        default: 0
      },
      size: {
        type: String,
        default: 'default'
      },
      direction: {
        type: String,
        default: 'horizontal'
      },
      progressDot: {
        type: Boolean,
        default: false
      },
      dotTips: {
        type: Boolean,
        default: false
      },
      stepList: {
        type: Array,
        default () {
          return []
        }
      }
    },
    methods: {
      getStatus (type) {
        let str = ''
        switch (type) {
          case 'process':
            str = '进行'
            break
          case 'wait':
            str = '等待'
            break
          case 'error':
            str = '错误'
            break
          case 'finish':
            str = '完成'
            break
        }
        return str
      }
    }
  }
</script>

<style scoped lang="scss">
  ::v-deep .ant-steps-item-icon {
    font-family: inherit;
  }
</style>
