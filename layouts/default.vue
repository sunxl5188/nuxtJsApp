<template>
  <client-only>
    <a-config-provider :locale="locale">
      <Nuxt/>
    </a-config-provider>
  </client-only>
</template>

<script>
  import locale from 'ant-design-vue/lib/locale-provider/zh_CN'
  import { syncVuex } from '~/assets/js/utils'

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
    },
    mounted () {
      syncVuex(this, 'home')
    }
  }
</script>

<style scoped>

</style>
