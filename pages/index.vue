<template>
  <div>
    <el-input v-model="input" placeholder="placeholder"></el-input>
    <el-button type="primary" @click="signIn">buttonCont</el-button>
  </div>
</template>

<script>
  export default {
    name: 'IndexPage',
    data () {
      return {
        input: ''
      }
    },
    computed: {
    },
    mounted () {
      this.$nextTick(() => {
        // console.log(this.$cookies)
      })
    },
    methods: {
      signIn(){
        console.log('登录中...')
        const data = {
          user: {
            name: 'sxl',
            phone: '13859906030',
            sex: 1
          },
          token: '1234567890'
        }
        this.$store.commit('signIn', data)
      }
    }
  }
</script>
