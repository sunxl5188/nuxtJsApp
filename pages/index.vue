<template>
  <div>
    <el-input v-model="input" placeholder="placeholder"></el-input>
    <nuxt-link to="/admin">后台</nuxt-link>
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
    methods: {

    }
  }
</script>
