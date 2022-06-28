<template>
  <div>
    <MyLoading :loading="loading"/>
    <a-breadcrumb v-if="!loading" :routes="routes">
      <template slot="itemRender" slot-scope="{ route }">
        <span v-if="routes.indexOf(route) === routes.length - 1">
          {{ route.breadcrumbName }}
        </span>
        <router-link v-else :to="{path: route.path}">
          {{ route.breadcrumbName }}
        </router-link>
      </template>
    </a-breadcrumb>
  </div>
</template>

<script>
  import MyLoading from '~/components/MyLoading'

  export default {
    name: 'MyBreadcrumb',
    components: { MyLoading },
    data () {
      return {
        loading: true,
        routes: []
      }
    },
    watch: {
      $route: {
        handler () {
          const routeArr = this.$route.matched
          this.routes = []
          routeArr.forEach(item => {
            this.routes.push({
              path: item.path,
              breadcrumbName: item.meta.title || ''
            })
          })
        },
        deep: true
      },
      routes (val, oldVal) {
        if (val) {
          this.$setStorage('breadcrumb', val)
        }
      }
    },
    async mounted () {
      this.routes = this.$getStorage('breadcrumb') || []
      await this.$nextTick()
      this.loading = false
    }
  }
</script>

<style scoped>

</style>
