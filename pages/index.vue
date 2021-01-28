<template>
  <div>
    <el-menu
      :default-active="activeIndex"
      mode="horizontal"
      :router="true"
      @select="handleSelect"
    >
      <el-menu-item index="/">
        首页
      </el-menu-item>
    </el-menu>
    <nuxt />
  </div>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
      activeIndex: '0'
    }
  },
  methods: {
    handleSelect () {}
  }
}
</script>

<style scoped>

</style>
