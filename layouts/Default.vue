<template>
  <a-config-provider :locale="locale">
    <Nuxt/>
  </a-config-provider>
</template>

<script>
  import locale from 'ant-design-vue/lib/locale-provider/zh_CN'

  export default {
    name: 'LayoutsDefault',
    data () {
      return {
        locale
      }
    },
    watch: {
      $route (to, from) {
        console.log(this.$route.matched, '----------------')
      }
    }
  }
</script>

<style scoped>

</style>
