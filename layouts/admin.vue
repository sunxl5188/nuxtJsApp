<template>
  <client-only>
    <a-config-provider :locale="locale">
      <a-layout v-if="!loading" style="min-height: 100vh">
        <!--菜单-->
        <div :style="vuex_menu.collapsed ? 'width:80px' : 'width:200px'" class="layoutSider">
          <a-layout-sider :collapsed="vuex_menu.collapsed">
            <div class="logo">
              <nuxt-link to="/admin" class="d-flex justify-content-center align-items-center">
                <img src="@/assets/images/logo.png" alt="">
                <h1 v-if="!vuex_menu.collapsed" class="m-2">Ant Design</h1>
              </nuxt-link>
            </div>
            <a-menu
              v-model="vuex_menu.selectedKeys"
              :open-keys="vuex_menu.openKeys"
              mode="inline"
              theme="dark"
              :inline-indent="15"
              :inline-collapsed="vuex_menu.collapsed"
              @openChange="onMenuChange"
              @select="onMenuSelect"
            >
              <a-sub-menu
                v-for="(subMenu, index) in menuList"
                :key="`sub${index}`"
              >
            <span slot="title">
              <a-icon :type="subMenu.icon"/>
              <span>{{subMenu.title}}</span>
            </span>
                <template v-for="(item, i) in subMenu.children">
                  <a-menu-item
                    v-if="!Object.prototype.hasOwnProperty.call(item, 'children')"
                    :key="`sub${index}-menu${i}`"
                  >
                    <nuxt-link :to="'/admin/'+subMenu.path + '/' + item.path">
                      {{item.title}}
                    </nuxt-link>
                  </a-menu-item>
                  <a-sub-menu v-else :key="`sub${index}-menu${i}`" :title="item.title">
                    <a-menu-item v-for="(itemTow, k) in item.children" :key="`sub${index}-menu${i}-child${k}`">
                      <nuxt-link :to="'/admin/'+subMenu.path + '/' + item.path + '/' + itemTow.path">
                        {{itemTow.title}}
                      </nuxt-link>
                    </a-menu-item>
                  </a-sub-menu>
                </template>
              </a-sub-menu>
            </a-menu>
          </a-layout-sider>
        </div>

        <div id="layoutScroll">
          <a-layout>
            <!--头部-->
            <a-layout-header class="bg-white u-px-15 d-flex justify-content-between align-items-center pl-4 pr-4">
              <div class="d-flex justify-content-start align-content-center">
                <a-icon :type="!vuex_menu.collapsed?'menu-fold':'menu-unfold'" class="mr-3" @click="setCollapsed"/>
                <MyBreadcrumb/>
              </div>
              <div class="header-right">
                <a-dropdown>
                  <div class="d-flex justify-content-between align-items-center">
                    <a-avatar
                      :src="vuex_user.avatarUrl"
                      class="bg-secondary mr-2"
                      :size="30"
                    />
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
              <Nuxt/>
            </a-layout-content>
          </a-layout>
        </div>
      </a-layout>
    </a-config-provider>
  </client-only>
</template>

<script>
  import locale from 'ant-design-vue/lib/locale-provider/zh_CN'
  import { getPrefix } from '@/assets/js/utils'
  import MyBreadcrumb from '~/components/MyBreadcrumb'

  const PREFIX = getPrefix()
  const hasLogin = `${PREFIX}hasLogin`

  export default {
    name: 'LayoutsAdmin',
    components: { MyBreadcrumb },
    middleware: 'auth',
    data () {
      return {
        loading: true,
        locale,
        upSignInState: '',
        tipsOut: 0,
        selectedKeys: [],
        openKeys: [],
        menuList: [
          {
            title: '仪表板',
            path: 'Dashboard',
            icon: 'dashboard',
            children: [
              {
                title: '工作台',
                path: 'WorkPlace',
              },
              {
                title: '分析页',
                path: 'Analysis',
              }
            ]
          },
          {
            title: '表单页',
            path: 'Form',
            icon: 'form',
            children: [
              {
                title: '基础表单',
                path: 'BaseForm',
              },
              {
                title: '分步表单',
                path: 'StepForm',
              },
              {
                title: '高级表单',
                path: 'AdvancedForm',
              }
            ]
          },
          {
            title: '列表页',
            path: 'List',
            icon: 'table',
            children: [
              {
                title: '查询表格',
                path: 'QueryList'
              },
              {
                title: '标准列表',
                path: 'StandardList'
              },
              {
                title: '卡片列表',
                path: 'CardList'
              },
              {
                title: '详细页',
                path: 'Detail',
                children: [
                  {
                    title: '基础详情页',
                    path: 'BasicDetail'
                  },
                  {
                    title: '高级详情页',
                    path: 'AdvancedDetail'
                  }
                ]
              }
            ]
          }
        ]
      }
    },
    async mounted () {
      // vuex~同步登录信息start
      this.$vuex('vuex_token', this.$getStorage('token'))
      this.$vuex('vuex_user', this.$getStorage('user'))
      if (this.$getStorage('vuex_menu') !== '') {
        this.$vuexAdmin('vuex_menu', this.$getStorage('vuex_menu'))
      }
      // vuex~同步登录信息end

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

      _.delay(() => {
        // http://manos.malihu.gr/repository/custom-scrollbar/demo/examples/complete_examples.html
        $('.ant-layout-sider-children').mCustomScrollbar({
          theme: 'minimal',
          scrollInertia: 0,
          axis: 'y'
        })

        $('#layoutScroll').mCustomScrollbar({
          theme: 'minimal-dark',
          scrollInertia: 0
        })

      }, 500)

    },
    beforeDestroy () {
      window.removeEventListener('click', this.upSignInState, false)
      window.removeEventListener('mousemove', this.upSignInState, false)
    },
    methods: {
      onMenuSelect ({ item, selectedKeys }) {
        this.$vuexAdmin('vuex_menu.selectedKeys', selectedKeys)
      },
      onMenuChange (openKeys) {
        this.$vuexAdmin('vuex_menu.openKeys', openKeys)
      },
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
          this.$router.push('/login')
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

  .layoutSider {
    height: 100vh;
    -webkit-transition: all 0.3s ease 0s;
    -moz-transition: all 0.3s ease 0s;
    -ms-transition: all 0.3s ease 0s;
    transition: all 0.3s ease 0s;
  }

  ::v-deep .ant-layout-sider {
    position: fixed;
    height: 100vh;
    left: 0;
    top: 0;
    bottom: 0;
    z-index: 9999;
  }

  #layoutScroll {
    width: 100vh;
    height: 100vh;
    overflow: hidden;
    flex: 1;
  }

</style>
