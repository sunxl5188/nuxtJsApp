<template>
  <div>{{ item }}</div>
</template>

<script>
export default {
  validate ({ params }) {
    return /^\d+$/.test(params.id)
  },
  async asyncData ({ $axios, params }) {
    const { data } = await $axios.$get(`/pdDetail?id=${params.id}`)
    return { item: data }
  },
  head () {
    return {
      title: this.item.title,
      meta: [
        { hid: 'keywords', name: 'keywords', content: this.item.content },
        { hid: 'description', name: 'description', content: this.item.content }
      ]
    }
  }
}
</script>

<style scoped>

</style>
