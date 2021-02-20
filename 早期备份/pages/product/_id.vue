<template>
  <div>
    <h4>{{info.title}}</h4>
    <hr>
    <p v-html="info.content"></p>
  </div>
</template>

<script>
export default {
  validate ({params}) {
    return /^\d+$/.test(params.id)
  },
  async asyncData ({$axios, params}) {
    const {data} = await $axios.$get(`/pdDetail?id=${params.id}`)
    return {info: data}
  },
  head () {
    return {
      title: this.info.title,
      meta: [
        {hid: 'keywords', name: 'keywords', content: this.info.title},
        {hid: 'description', name: 'description', content: this.info.title}
      ]
    }
  }
}
</script>

<style scoped>

</style>
