<template>
    <a-config-provider :locale="locale">
        <a-layout style="height: 100vh">
            <!--菜单-->
            <AdminMenu/>
            <a-layout>
                <div class="layoutScroll" style="height:100vh;overflow:hidden !important;">
                    <!--头部-->
                    <AdminHeader/>
                    <!--内容-->
                    <a-layout-content class="p-3">
                        <Nuxt/>
                    </a-layout-content>
                </div>
            </a-layout>
        </a-layout>
    </a-config-provider>
</template>

<script>
  import locale from 'ant-design-vue/lib/locale-provider/zh_CN'
  import { getPrefix, syncVuex } from '@/assets/js/utils'
  import AdminMenu from '~/layouts/AdminMenu'
  import AdminHeader from '~/layouts/AdminHeader'

  const PREFIX = getPrefix()
  const hasLogin = `${PREFIX}hasLogin`

  export default {
    name: 'AdminLayouts',
    components: { AdminHeader, AdminMenu },
    middleware: 'auth',
    data () {
      return {
        loading: true,
        locale,
        upSignInState: '',
        tipsOut: 0
      }
    },
    async mounted () {
      syncVuex(this, 'admin')

      await this.$nextTick()
      this.loading = false

      // **************************************
      this.upSignInState = function () {
        if (this.$cookies.get(hasLogin)) {
          this.$cookies.set(hasLogin, 1, '1h')
        } else if (this.tipsOut === 0) {
          this.tipsOut++
          this.$info({
            title: '温馨提示',
            content: '登录信息已过期',
            onOk: () => {
              this.actionOut()
            }
          })
        }
      }

      window.addEventListener('click', this.upSignInState, false)
      window.addEventListener('mousemove', this.upSignInState, false)

      this.$nextTick(() => {
        // http://manos.malihu.gr/repository/custom-scrollbar/demo/examples/complete_examples.html
        $('.layoutScroll').mCustomScrollbar({
          theme: 'minimal-dark',
          scrollInertia: 300,
          axis:'y'
        })
      })

    },
    beforeDestroy () {
      window.removeEventListener('click', this.upSignInState, false)
      window.removeEventListener('mousemove', this.upSignInState, false)
    }
  }
</script>

<style scoped lang="scss">

</style>
