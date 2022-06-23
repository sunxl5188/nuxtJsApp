<template>
  <div><h4>后台</h4>
    <nuxt-link to="/">首页</nuxt-link>
    <nuxt-link to="/admin/list">列表页</nuxt-link>
    <nuxt-link to="/admin/form/baseForm">基础表单</nuxt-link>
  </div>
</template>

<script>
  export default {
    name: 'AdminIndex',
    layout: 'admin'
  }
</script>

<style scoped>

</style>
