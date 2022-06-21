<template>
  <div v-show="visible" class="text-center pt-3 pb-3">
    <a-spin :spinning="visible" :delay="delay" :tip="showText ? tip : ''"></a-spin>
  </div>
</template>

<script>
  export default {
    name: 'MyLoading',
    props: {
      visible: {
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
      },
      showText: {
        type: Boolean,
        default () {
          return false
        }
      }
    }
  }
</script>

<style scoped>

</style>
