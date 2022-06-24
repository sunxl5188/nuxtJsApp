<template>
  <a-config-provider :locale="locale">
    <a-layout v-if="!loading" style="min-height: 100vh">
      <!--菜单-->
      <div :style="vuex_menu.collapsed ? 'width:80px' : 'width:200px'" class="layoutSider">
        <a-layout-sider :collapsed="vuex_menu.collapsed">
          <div style="width:200px;">
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
              <a-sub-menu v-for="(subMenu, index) in menuList" :key="`sub${index}`">
            <span slot="title">
              <a-icon :type="subMenu.icon"/>
              <span>{{subMenu.title}}</span>
            </span>
                <template v-for="(item, i) in subMenu.children">
                  <a-menu-item
                    v-if="!Object.prototype.hasOwnProperty.call(item, 'children')"
                    :key="`sub${index}-menuItem${i}`">
                    <nuxt-link :to="'/admin/'+subMenu.path + '/' + item.path">
                      {{item.title}}
                    </nuxt-link>
                  </a-menu-item>
                  <a-sub-menu v-else :key="`sub${index}-menuItem${i}`" :title="item.title">
                    <a-menu-item v-for="(itemTow, k) in item.children" :key="`sub${index}-menuItem${i}-${k}`">
                      <nuxt-link :to="'/admin/'+subMenu.path + '/' + item.path + '/' + itemTow.path">
                        {{itemTow.title}}
                      </nuxt-link>
                    </a-menu-item>
                  </a-sub-menu>
                </template>
              </a-sub-menu>
            </a-menu>
          </div>
        </a-layout-sider>
      </div>

      <div id="layoutScroll">
        <a-layout>
          <!--头部-->
          <a-layout-header class="bg-white u-px-15 d-flex justify-content-between align-items-center pl-4 pr-4">
            <a-icon :type="!vuex_menu.collapsed?'menu-fold':'menu-unfold'" @click="setCollapsed"/>
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
</template>

<script>
  import locale from 'ant-design-vue/lib/locale-provider/zh_CN'
  import { getPrefix } from '@/assets/js/utils'

  const PREFIX = getPrefix()
  const hasLogin = `${PREFIX}hasLogin`

  export default {
    name: 'LayoutsAdmin',
    components: {},
    middleware: 'auth',
    data () {
      return {
        loading: true,
        locale,
        upSignInState: '',
        tipsOut: 0,
        menuList: [
          {
            title: '仪表板',
            path: 'dashboard',
            icon: 'dashboard',
            children: [
              {
                title: '工作台',
                path: 'workplace',
              },
              {
                title: '分析页',
                path: 'analysis',
              }
            ]
          },
          {
            title: '表单页',
            path: 'form',
            icon: 'form',
            children: [
              {
                title: '基础表单',
                path: 'baseForm',
              },
              {
                title: '分步表单',
                path: 'stepForm',
              },
              {
                title: '高级表单',
                path: 'advancedform',
              }
            ]
          },
          {
            title: '列表页',
            path: 'list',
            icon: 'table',
            children: [
              {
                title: '查询表格',
                path: 'querylist'
              },
              {
                title: '标准列表',
                path: 'standardlist'
              },
              {
                title: '卡片列表',
                path: 'cardlist'
              },
              {
                title: '详细页',
                path: 'detail',
                children: [
                  {
                    title: '基础详情页',
                    path: 'basicdetail'
                  },
                  {
                    title: '高级详情页',
                    path: 'advanceddetail'
                  }
                ]
              }
            ]
          }
        ]
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

      console.log(this.$router.getRoutes())

      _.delay(() => {
        // http://manos.malihu.gr/repository/custom-scrollbar/demo/examples/complete_examples.html
        $('.ant-layout-sider-children').mCustomScrollbar({
          theme: 'minimal',
          axis: 'y'
        })

        $('#layoutScroll').mCustomScrollbar({
          theme: 'minimal-dark'
        })
      }, 500)

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
