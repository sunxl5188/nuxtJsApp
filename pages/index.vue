<template>
  <div class="container">
    <b-button variant="danger" :to="{name: 'index'}">
      首页
    </b-button>
    <div>
      <nuxt-link :to="{name: 'index-detail'}">
        详情列表页面
      </nuxt-link>
    </div>
    <Nuxt />
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  mounted () {
  },
  methods: {
  }
}
</script>

<style>

</style>
