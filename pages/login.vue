<template>
  <div>
    <a-button type="primary" @click="signIn">登录</a-button>
  </div>
</template>

<script>
  export default {
    name: 'LogIn',
    data () {
      return {}
    },
    methods: {
      signIn () {
        this.$api.login.signIn().then(res=>{
          console.log(res)
        })
        const data = {
          user: {
            name: 'sxl',
            phone: '13859906030',
            sex: 1
          },
          token: '1234567890~~~'
        }
        this.$store.dispatch('asySignIn', data)
        _.delay(() => {
          // this.$router.push('/')
        }, 1000)
      }
    }
  }
</script>

<style scoped>
  a {
    background: #000000;
    color: #ffffff;
    padding: 1px 3px;
    border-radius: 4px;
    font-size: 12px;
  }
</style>
