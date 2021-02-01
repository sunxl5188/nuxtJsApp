<template>
  <b-container class="bg-light p-5">
    <b-pagination-nav :link-gen="linkGen" :number-of-pages="10" use-router />
  </b-container>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
      name: '',
      currentPage: 1,
      mainProps: {
        center: true,
        fluidGrow: true,
        blank: true,
        class: 'my-5'
      }
    }
  },
  computed: {},
  methods: {
    showModal () {
      this.$refs.my.show()
    },
    linkGen (pageNum) {
      return pageNum === 1 ? '?' : `?page=${pageNum}`
    }
  }
}
</script>

<style scoped></style>
