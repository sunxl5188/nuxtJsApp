<template>
  <div class="container">
    <nuxt-link to="/article/1">新闻</nuxt-link>
    <nuxt-link to="admin">进入后台</nuxt-link>
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
      return {}
    },
    fetch (content) {},
    computed: {},
    mounted () {
    },
    methods: {}
  }
</script>
<style lang="scss">

</style>
