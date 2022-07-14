<template>
  <div v-if="loading" class="p-3 d-flex justify-content-center">
    <a-spin :spinning="loading" :delay="delay" :tip="tip"></a-spin>
  </div>
</template>

<script>
  export default {
    name: 'MyLoading',
    props: {
      loading: {
        type: Boolean,
        default () {
          return false
        }
      },
      delay: {
        type: Number,
        default: 100
      },
      tip: {
        type: String,
        default: '数据加载中...'
      }
    }
  }
</script>

<style scoped>

</style>
