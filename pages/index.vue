<template>
  <div>reStore</div>
</template>

<script>
  export default {
    name: 'IndexPage',
    data () {
      return {}
    },
    computed: {
    },
    mounted () {
      this.$nextTick(() => {
        console.log(this, 'reStore')
      })
    },
    methods: {}
  }
</script>
