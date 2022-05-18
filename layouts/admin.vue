<template>
  <a-config-provider :locale="locale">
    <a-layout v-if="!loading" style="min-height: 100vh">
      <!--菜单-->
      <a-layout-sider :collapsed="vuex_menu.collapsed">
        <div class="logo">
          <nuxt-link to="/admin" class="d-flex justify-content-center align-items-center">
            <img src="@/assets/images/logo.png" alt="">
            <h1 v-if="!vuex_menu.collapsed" class="m-2">Ant Design</h1>
          </nuxt-link>
        </div>
        <a-menu
          mode="inline"
          theme="dark"
          :inline-collapsed="vuex_menu.collapsed"
        >
          <a-menu-item key="1">
            <a-icon type="home"/>
            <span><nuxt-link to="/admin">首页</nuxt-link></span>
          </a-menu-item>
          <a-sub-menu key="sub1">
            <span slot="title"><a-icon type="mail"/><span>Navigation One</span></span>
            <a-menu-item key="5">
              <nuxt-link to="/admin/list">基础列表</nuxt-link>
            </a-menu-item>
            <a-menu-item key="6">
              Option 6
            </a-menu-item>
            <a-menu-item key="7">
              Option 7
            </a-menu-item>
            <a-menu-item key="8">
              Option 8
            </a-menu-item>
          </a-sub-menu>
        </a-menu>
      </a-layout-sider>
      <a-layout>
        <!--头部-->
        <a-layout-header class="bg-white u-px-15 d-flex justify-content-between align-items-center">
          <a-icon :type="!vuex_menu.collapsed?'menu-fold':'menu-unfold'" @click="setCollapsed"/>
          <div class="header-right">
            <a-dropdown>
              <div class="d-flex justify-content-between align-items-center">
                <a-avatar
                  :src="avatar"
                  class="bg-secondary"
                  :size="35"/>
                <span class="u-px-5">{{vuex_user.username}}</span>
                <a-icon type="down"/>
              </div>
              <a-menu slot="overlay">
                <a-menu-item key="0">
                  <a-button type="link">修改密码</a-button>
                </a-menu-item>
                <a-menu-item key="1">
                  <a-button type="link">个人中心</a-button>
                </a-menu-item>
                <a-menu-item key="2">
                  <a-button type="link" @click="loginOut">退出登录</a-button>
                </a-menu-item>
              </a-menu>
            </a-dropdown>
          </div>
        </a-layout-header>
        <!--内容-->
        <a-layout-content class="p-3">
          <div class="bg-white p-3">
            <Nuxt/>
          </div>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-config-provider>
</template>

<script>
  import locale from 'ant-design-vue/lib/locale-provider/zh_CN'
  import { getPrefix } from '@/static/js/utils'

  const PREFIX = getPrefix()
  const hasLogin = `${PREFIX}hasLogin`

  export default {
    name: 'LayoutsAdmin',
    middleware: 'auth',
    data () {
      return {
        loading: true,
        locale,
        avatar: require('@/assets/images/avatar.jpg'),
        upSignInState: '',
        tipsOut: 0
      }
    },
    async mounted () {
      await this.$nextTick()
      this.loading = false
      // 同步登录信息
      this.$store.commit('initState')
      // **************************************
      this.upSignInState = _.debounce(() => {
        if (this.$cookies.get(hasLogin)) {
          this.$cookies.set(hasLogin, 1, '1h')
        } else if (this.$route.path !== '/admin/login' && this.tipsOut === 0) {
          this.tipsOut++
          this.$info({
            title: '温馨提示',
            content: '登录信息已过期',
            onOk: () => {
              this.actionOut()
            }
          })
        }
      }, 3000);

      ['click', 'mousemove'].forEach(item => {
        window.addEventListener(item, this.upSignInState)
      })

    },
    methods: {
      setCollapsed () {
        this.$vuexAdmin('vuex_menu.collapsed', !this.vuex_menu.collapsed)
      },
      loginOut () {
        this.$confirm({
          title: '温馨提示',
          content: '您确定要退出登录吗？',
          onOk: () => {
            this.actionOut()
          }
        })
      },
      actionOut () {
        this.$store.dispatch('asySignOut')
        this.$nextTick(() => {
          this.$router.push('/admin/login')
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .logo {
    height: 64px;
    background: #000;
    padding: 16px 14px;

    a {
      height: 32px;
      display: inline-block;

      img {
        width: 26px;
        height: 26px;
      }

      h1 {
        display: inline-block;
        margin: 0 0 0 12px;
        font-size: 18px;
        color: #ffffff;
      }
    }
  }

  .ant-menu {
    ::v-deep svg {
      vertical-align: unset !important;
    }

    .anticon + span a {
      color: #fff;
    }
  }

</style>
