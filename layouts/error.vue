<template>
  <div class="d-flex justify-content-center align-items-center h-100">
    <div v-if="error.statusCode === 500" class="text-center">
      <h3>发生错误</h3>
      <h5 class="text-danger">{{error.message}}</h5>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ErrorPage',
    props: {
      error: {
        type: Object,
        default () {
          return {}
        }
      }
    }
  }
</script>

<style scoped>

</style>
