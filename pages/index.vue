<template>
    <div class="text-center">
      <div class="mt-5 pb-4 d-flex justify-content-center align-items-center">
        <img src="@/assets/images/ecc9a4ca55d7eea12cc0bf0a19653352.jpeg" alt="">
        <img src="@/assets/images/d032ae10c349c543057b24bdbbf0d317.jpeg" alt="">
      </div>
      <div class="container">
        <a-space align="baseline" direction="horizontal" size="large">
          <nuxt-link to="/">首页</nuxt-link>
          <nuxt-link to="login">登录</nuxt-link>
          <nuxt-link to="admin">进入后台</nuxt-link>
        </a-space>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'IndexPage',
    components: {},
    asyncData ({ query }) {
      return query
    },
    data () {
      return {  }
    },
    fetch (content) {},
    computed: {},
    mounted () {
    },
    methods: { }
  }
</script>
<style scoped lang="scss">

</style>
