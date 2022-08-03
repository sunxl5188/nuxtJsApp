<template>
  <div class="error-container">
    <div class="error-content text-center">
      <div>
        <img src="@/assets/images/500.png" alt="500">
      </div>
      <a-space align="center" direction="horizontal" size="large" class="u-m-t-50">
        <a-button type="default" @click="$router.back()">{{jumpTime}}s 返回上一页</a-button>
        <a-button type="primary" @click="$router.push('/')">返回首页</a-button>
      </a-space>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ErrorServer',
    data () {
      return {
        jumpTime: 5,
        timer: ''
      }
    },
    mounted () {
      this.timeChange()
    },
    beforeDestroy(){
      if (this.timer) {
        clearInterval(this.timer)
      }
    },
    methods: {
      timeChange () {
        this.timer = setInterval(() => {
          if (this.jumpTime > 1) {
            this.jumpTime--
          } else {
            this.onClearInterval()
          }
        }, 1000)
      },
      onClearInterval () {
        clearInterval(this.timer)
        this.$nextTick(() => {
          this.$router.back()
        })
      }
    }
  }
</script>

<style scoped>

</style>
