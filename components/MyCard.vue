<template>
  <a-card
    :size="size"
    :bordered="bordered"
  >
    <span slot="title">
      <span class="line"></span>
      <span class="ml-2">{{title}}</span>
    </span>
    <span slot="extra"><slot name="extra"/></span>
    <span slot="default"><slot name="default"/></span>
    <span slot="cover"><slot name="cover"/></span>
    <span slot="actions"><slot name="actions"/></span>
  </a-card>
</template>

<script>
  export default {
    name: 'MyCard',
    props: {
      title: {
        type: String,
        default: ''
      },
      bordered: {
        type: Boolean,
        default: false
      },
      size: {
        type: String,
        default: 'default'
      }
    }
  }
</script>

<style scoped lang="scss">
  .line {
    display: inline-block;
    width: 4px;
    height: 16px;
    background-color: $primary;
    border-radius: 4px;
    vertical-align: middle;
  }

  .line + span {
    vertical-align: middle;
    color: $primary;
  }
</style>
