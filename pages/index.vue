<template>
  <div>
    <a-button type="primary" @click="$router.push('./login')">404</a-button>
    <a-button type="primary" @click="$router.push('/error/403')">403</a-button>
    <a-button type="primary" @click="$router.push('/error/500')">500</a-button>
    <h1>数智引力后台管理系统</h1>
    <h2>数智引力后台管理系统</h2>
    <h3>数智引力后台管理系统</h3>
    <h4>数智引力后台管理系统</h4>
    <h5>数智引力后台管理系统</h5>
    <h6>数智引力后台管理系统</h6>
  </div>
</template>

<script>
  export default {
    name: 'IndexPage',
    data () {
      return {
        input: ''
      }
    },
    computed: {
    },
    mounted () {
      this.$nextTick(() => {
        // console.log(this.$cookies)
      })
    },
    methods: {}
  }
</script>
