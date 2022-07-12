<template>
  <MyCard>
    <a-tabs default-active-key="0" type="line" :hide-add="true">
      <template slot="tabBarExtraContent"><slot name="tabBarExtra"></slot></template>
      <a-tab-pane v-for="(item, index) in tabsList" :key="item.label + index" :tab="item.label">
        <slot></slot>
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
      }
    },
    data () {
      return {}
    },
    watch: {},
    mounted () {},
    methods: {}
  }
</script>

<style scoped>

</style>
