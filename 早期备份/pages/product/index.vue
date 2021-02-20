<template>
  <div>
    <div class="row">
      <div class="col-sm-3 col-md-3 col-lg-3 col-xl-3" v-for="(item, i) in list" :key="i">
        <figure class="figure">
          <nuxt-link :to="{ name: 'product-id', params: { id: item.id } }">
            <img :src="item.picture" class="figure-img img-thumbnail"/>
          </nuxt-link>
          <figcaption class="figure-caption">{{item.title}}</figcaption>
        </figure>
      </div>
    </div>
    <Pagination :total="total" :currentPage="current" :display="16" @pageChange="pageChange"></Pagination>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'

export default {
  name: 'index',
  data () {
    return {
      current: parseInt(this.$route.query.page) || 1
    }
  },
  scrollToTop: false,
  watchQuery: ['page', 'keyword'],
  async asyncData ({$axios, query}) {
    let params = new URLSearchParams()
    params.append('page', query.page || 1)
    params.append('keyword', query.keyword || '')
    const {data} = await $axios.$post('product', params)
    return {
      list: data.list,
      total: data.total
    }
  },
  methods: {
    pageChange (p) {
      let query = {page: p}
      if (this.keyword) {
        query.keyword = this.keyword
      }
      this.$router.push({
        path: '/product',
        query: query
      })
      this.$forceUpdate()
    }
  },
  components: {
    Pagination
  }
}
</script>

<style scoped>

</style>
