<template>
  <div :class="cardClass">
    <a-card
      :title="title"
      :size="size"
      :bordered="bordered"
      :loading="loading"
      :body-style="bodyStyle"
      :tab-list="tabList"
      :active-tab-key="value"
      @tabChange="key => $emit('input', key)"
    >
      <span v-if="extra" slot="extra"><slot name="extra"/></span>
      <span slot="default"><slot name="default"/></span>
      <span slot="cover"><slot name="cover"/></span>
      <template v-if="actions" slot="actions">
        <slot name="actions"></slot>
      </template>
    </a-card>
    <div v-if="footer" class="card-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'MyCard',
    model: {
      prop: 'value',
      event: 'input'
    },
    props: {
      loading: {
        type: Boolean,
        default: false
      },
      title: {
        type: String,
        default: ''
      },
      extra: {
        type: Boolean,
        default: false
      },
      actions: {
        type: Boolean,
        default: false
      },
      bordered: {
        type: Boolean,
        default: false
      },
      size: {
        type: String,
        default: 'default'
      },
      bodyStyle: {
        type: Object,
        default () {
          return {}
        }
      },
      tabList: {
        type: Array,
        default () {
          return []
        }
      },
      cardClass: {
        type: String,
        default: 'u-m-b-20'
      },
      footer: {
        type: Boolean,
        default: false
      },
      value: {
        type: [String, Number],
        default: ''
      }
    }
  }
</script>

<style scoped lang="scss">
  .card-footer {
    border-top: 1px solid #e8e8e8;
    background-color: #fff;
  }
</style>
