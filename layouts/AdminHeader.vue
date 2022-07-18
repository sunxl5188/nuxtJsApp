<template>
  <a-layout-header class="bg-white u-px-15 d-flex justify-content-between align-items-center pl-4 pr-4">
    <div class="d-flex justify-content-start align-content-center">
      <a-icon :type="!vuexMenu.collapsed?'menu-fold':'menu-unfold'" class="mr-3" @click="setCollapsed"/>
      <MyBreadcrumb/>
    </div>
    <div class="header-right">
      <a-dropdown>
        <div class="d-flex justify-content-between align-items-center">
          <a-avatar
            :src="vuexUser.avatarUrl"
            class="bg-secondary mr-2"
            :size="30"
          />
          <span class="u-px-5">{{vuexUser.username}}</span>
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
</template>

<script>
  export default {
    name: 'AdminHeader',
    data () {
      return {
        vuexMenu: {
          collapsed: false,
          selectedKeys: [],
          openKeys: [],
          list: []
        },
        vuexUser: {
          avatarUrl: '',
          username: ''
        }
      }
    },
    watch: {
      vuex_menu: {
        handler () {
          Object.assign(this.vuexMenu, this.vuex_menu)
        },
        deep: true
      },
      vuex_user: {
        handler () {
          Object.assign(this.vuexUser, this.vuex_user)
        },
        deep: true
      }
    },
    mounted () {
      Object.assign(this.vuexMenu, this.vuex_menu)
      Object.assign(this.vuexUser, this.vuex_user)

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
        this.$store.commit('signOut')
        this.$store.commit('admin/clearData')
        this.$nextTick(() => {
          this.$router.push('/login')
        })
      }
    }
  }
</script>

<style scoped>

</style>
