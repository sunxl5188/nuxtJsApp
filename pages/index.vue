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
      <el-menu-item index="/about">
        关于我们
      </el-menu-item>
    </el-menu>
    <Nuxt />
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
    handleSelect (e) {
      console.log(e)
    }
  }
}
</script>

<style scoped>

</style>
