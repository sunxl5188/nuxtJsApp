<template>
  <div></div>
</template>

<script>
export default {
  name: 'IndexPage',
  mounted () {
    this.$axios.$get('admin/mirror/bannerList')
  }
}
</script>
