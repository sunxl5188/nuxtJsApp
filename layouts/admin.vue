<template>
  <div>
    <h1>admin</h1>
    <Nuxt />
  </div>
</template>

<script>
  export default {
    name: 'LayoutsAdmin',
    middleware: 'auth'
  }
</script>

<style scoped>

</style>
