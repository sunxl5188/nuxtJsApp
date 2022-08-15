<template>
    <div>
      <nav class="navbar navbar-expand-md navbar-light bg-light">
        <a class="navbar-brand" href="#">Navbar</a>
        <button
class="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId"
                aria-controls="collapsibleNavId"
                aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div id="collapsibleNavId" class="collapse navbar-collapse">
          <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
            <li class="nav-item active">
              <nuxt-link to="/" class="nav-link">首页</nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link to="login" class="nav-link">登录</nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link to="AnimationEffect" class="nav-link">滚动动画</nuxt-link>
            </li>
          </ul>
        </div>
      </nav>

      <div class="text-center mt-5 pb-4 d-flex justify-content-center align-items-center">
        <img src="@/assets/images/ecc9a4ca55d7eea12cc0bf0a19653352.jpeg" alt="">
        <img src="@/assets/images/d032ae10c349c543057b24bdbbf0d317.jpeg" alt="">
      </div>

      <div class="text-center">
        <VerificationCode></VerificationCode>
      </div>
      <a-button type="default" @click="visible=true">Modal</a-button>
      <MyModal v-model="visible">Modal内容</MyModal>
    </div>
</template>

<script>

  export default {
    name: 'IndexPage',
    components: { },
    asyncData ({ query }) {
      return query
    },
    data () {
      return {
        current: [],
        visible: false
      }
    },
    fetch (content) {},
    computed: {},
    mounted () { },
    methods: { }
  }
</script>
<style scoped lang="scss">

</style>
