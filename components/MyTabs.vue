<template>
  <MyCard>
    <a-tabs :default-active-key="defaultActiveKey" type="line" :hide-add="true">
      <template slot="tabBarExtraContent">
        <slot name="tabBarExtra"></slot>
      </template>
      <a-tab-pane v-for="(item, index) in tabsList" :key="index" :tab="item.label">
        <slot :name="'tabs'+(index+1)"></slot>
      </a-tab-pane>
    </a-tabs>
  </MyCard>
</template>

<script>
  import MyCard from '~/components/MyCard'

  export default {
    name: 'MyTabs',
    components: { MyCard },
    props: {
      tabsList: {
        type: Array,
        required: true,
        default () {
          return []
        }
      },
      defaultActiveKey: {
        type: Number,
        default: 0
      }
    }
  }
</script>

<style scoped>

</style>
