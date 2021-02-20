<template>
  <div class="container">
    <nuxt-link to="/product" class="btn btn-primary">产品</nuxt-link>
    <button type="button" class="btn btn-primary" @click="signIn(data)">登录</button>
    <button type="button" class="btn btn-success" @click="signOut">登出</button>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  data () {
    return {
      data: {
        user: {
          company: "申学纪123",
          date: "",
          headphoto: "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKLa3hovwyx3v8ibbicKA8X5X1P8U2OyShiaxTDpEvpbL1J53Vlj4gGiayTX1wwdLINUibwxZYTb63IHZQ/132",
          logo: "//www.applyoversea.com/Uploads/logo/CP2.jpeg?0.8095737320929877",
          main_account: 0,
          name: "sunxl"
        },
        token: "ee36d7b7f7ee246d84a4f220d8a7e6ae"
      }
    }
  },
  computed: {
    ...mapState(['user', 'token'])
  },
  watchQuery: ['page', 'keyword'],
  mounted () {

  },
  methods: {
    ...mapActions(['signIn', 'signOut'])
  },
  components: {}
}
</script>

<style scoped>

</style>

