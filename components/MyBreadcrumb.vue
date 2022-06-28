<template>
  <div>
    <MyLoading :loading="loading"/>
    <a-breadcrumb v-if="!loading" :routes="routes">
      <template slot="itemRender" slot-scope="{ route }">
        <span v-if="routes.indexOf(route) === routes.length - 1">
          {{ route.breadcrumbName }}
        </span>
        <router-link v-else :to="{path: route.path}">
          <span @click="nuxtLink(route.breadcrumbName)">{{ route.breadcrumbName }}</span>
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
    },
    methods: {
      nuxtLink (name) {
        /* if (name === '仪表板') {
          this.$setStorage('selectedKeys', ['sub0-menu0'])
        }
        if (name === '表单页') {
          this.$setStorage('selectedKeys', ['sub1-menu0'])
        }
        if (name === '列表页') {
          this.$setStorage('selectedKeys', ['sub2-menu0'])
        }
        if (name === '详细页') {
          this.$setStorage('selectedKeys', ['sub2-menu3-child0'])
        } */
      }
    }
  }
</script>

<style scoped>

</style>
