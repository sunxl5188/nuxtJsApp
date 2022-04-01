<template>
  <div>
    ...................
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  mounted () {
    this.$nextTick(() => {
      this.$axios.$get('/1212')
    })
  }
}
</script>
