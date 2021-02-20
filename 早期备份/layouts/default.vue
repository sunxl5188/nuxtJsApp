<template>
  <div class="container">
    <nuxt/>
  </div>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  mounted () {
    this.$cookies.get('upToken') && this.upToken(this.$cookies.get('token'))
    this.$cookies.get('upUser') && this.upToken(this.$cookies.get('upUser'))
  },
  methods: {
    ...mapActions(['upUser', 'upToken'])
  }
}
</script>
<style>

</style>

