<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider>
      <a-menu
        v-model="current"
        theme="dark"
        mode="inline"
      >
        <a-menu-item key="home">
          <a-icon type="home" />首页
        </a-menu-item>
        <a-sub-menu key="settings">
          <span slot="title">
            <a-icon type="setting" />
            设置
          </span>
          <a-menu-item-group>
            <a-menu-item key="settings-1">
              菜单一
            </a-menu-item>
            <a-menu-item key="settings-2">
              菜单二
            </a-menu-item>
          </a-menu-item-group>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header>

      </a-layout-header>
      <a-layout-content>

      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
  export default {
    name: 'LayoutsAdmin',
    middleware: 'auth',
    data () {
      return {
        current: ''
      }
    },
  }
</script>

<style scoped>

</style>
