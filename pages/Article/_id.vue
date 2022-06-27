<template>
  <div>
    <div style="width:500px;margin:0 auto;padding-top: 200px;">{{params}}{{query}}</div>
  </div>
</template>

<script>
  export default {
    asyncData ({ query, params }) {
      return { query, params }
    },
    data () {
      return {}
    },
    watch: {
    },
    mounted () {
    }
  }
</script>

<style scoped>

</style>
