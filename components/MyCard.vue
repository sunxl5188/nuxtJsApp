<template>
  <a-card
    :title="title"
    :size="size"
    :bordered="bordered"
    :loading="loading"
    :body-style="bodyStyle"
  >
    <span v-if="extra" slot="extra"><slot name="extra"/></span>
    <span slot="default"><slot name="default"/></span>
    <span slot="cover"><slot name="cover"/></span>
  </a-card>
</template>

<script>
  export default {
    name: 'MyCard',
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
      }
    }
  }
</script>

<style scoped lang="scss">

</style>
