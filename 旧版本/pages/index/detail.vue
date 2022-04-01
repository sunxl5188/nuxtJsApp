<template>
  <div>
    <nuxt-link :to="{ name: 'index-detail-id', params: { id: 4 } }">
      打开详情内容页---------------
    </nuxt-link>
    <nuxt />
  </div>
</template>

<script>
export default {
  name: 'Detail'
}
</script>

<style scoped>

</style>
