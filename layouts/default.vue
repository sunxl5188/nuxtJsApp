<template>
  <a-layout id="layout-custom-trigger">
    <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
      <div class="logo" />
      <a-menu theme="dark" mode="inline" :default-open-keys="['sub1']" :selected-keys="['sub1-3']">
        <a-menu-item key="1">
          <a-icon type="user" />
          <span>
            <nuxt-link to="/home" class="text-white">
              菜单一
            </nuxt-link>
          </span>
        </a-menu-item>
        <a-menu-item key="2">
          <a-icon type="video-camera" />
          <span>菜单二</span>
        </a-menu-item>
        <a-menu-item key="3">
          <a-icon type="upload" />
          <span>菜单三</span>
        </a-menu-item>
        <a-sub-menu key="sub1">
          <span slot="title"><a-icon type="mail" />
            <span>二级菜单</span>
          </span>
          <a-menu-item key="sub1-1" @click="onSelect">
            二级菜单1
          </a-menu-item>
          <a-menu-item key="sub1-2">
            二级菜单2
          </a-menu-item>
          <a-menu-item key="sub1-3">
            <nuxt-link to="/about" class="text-white">
              二级菜单3
            </nuxt-link>
          </a-menu-item>
          <a-menu-item key="sub1-4">
            二级菜单4
          </a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header>
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="() => (collapsed = !collapsed)"
        />
      </a-layout-header>
      <a-layout-content>
        <a-config-provider :locale="zhCN">
          <Nuxt />
        </a-config-provider>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'

export default {
  data () {
    return {
      zhCN,
      collapsed: false
    }
  },
  methods: {
    onSelect (e) {
      console.log(e)
    }
  }
}
</script>

<style>

</style>
