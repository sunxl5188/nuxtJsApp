<template>
    <a-button :type="canGetCode ? btnType : 'grey'" :size="btnSize" @click="getCode">{{tips}}</a-button>
</template>

<script>
  export default {
    name: "VerificationCode",
    props: {
      phone: {
        type: [String, Number],
        default: ''
      },
      btnType: {
        type: String,
        default: 'danger'
      },
      btnSize: {
        type: String,
        default: 'default'
      },
      // 倒计时总秒数
      seconds: {
        type: [String, Number],
        default: 60
      },
      // 尚未开始时提示
      startText: {
        type: String,
        default: '获取验证码'
      },
      // 正在倒计时中的提示
      changeText: {
        type: String,
        default: 'X秒重新获取'
      },
      // 倒计时结束时的提示
      endText: {
        type: String,
        default: '重新获取'
      },
      // 是否在H5刷新或各端返回再进入时继续倒计时
      keepRunning: {
        type: Boolean,
        default: false
      },
      // 为了区分多个页面，或者一个页面多个倒计时组件本地存储的继续倒计时变了
      uniqueKey: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        secNum: this.seconds,
        timer: null,
        canGetCode: true, // 是否可以执行验证码操作
        timestamp: this.uniqueKey + '_$uCountDownTimestamp',
        tips: this.startText
      }
    },
    watch: {
      seconds: {
        immediate: true,
        handler(n) {
          this.secNum = n;
        }
      }
    },
    mounted() {
      this.checkKeepRunning();
    },
    // 组件销毁的时候，清除定时器，否则定时器会继续存在，系统不会自动清除
    beforeDestroy() {
      this.setTimeToStorage();
      clearTimeout(this.timer);
      this.timer = null;
    },
    methods: {
      getCode() {
        if(this.canGetCode) {
          // 模拟向后端请求验证码
          console.log('正在获取验证码')
          setTimeout(() => {
            // 这里此提示会被this.start()方法中的提示覆盖
            console.log('验证码已发送')
            // 通知验证码组件内部开始倒计时
            this.start();
          }, 2000);
        } else {
          console.log('倒计时结束后再发送')
        }
      },
      checkKeepRunning() {
        // 获取上一次退出页面(H5还包括刷新)时的时间戳，如果没有上次的保存，此值可能为空
        const lastTimestamp = Number(this.$getStorage(this.timestamp))
        if(!lastTimestamp) return this.changeEvent(this.startText);
        // 当前秒的时间戳
        const nowTimestamp = Math.floor((+ new Date()) / 1000);
        // 判断当前的时间戳，是否小于上一次的本该按设定结束，却提前结束的时间戳
        if(this.keepRunning && lastTimestamp && lastTimestamp > nowTimestamp) {
          // 剩余尚未执行完的倒计秒数
          this.secNum = lastTimestamp - nowTimestamp;
          // 清除本地保存的变量
          this.$remStorage(this.timestamp)
          // 开始倒计时
          this.start();
        } else {
          // 如果不存在需要继续上一次的倒计时，执行正常的逻辑
          this.changeEvent(this.startText);
        }
      },
      // 开始倒计时
      start() {
        // 防止快速点击获取验证码的按钮而导致内部产生多个定时器导致混乱
        if(this.timer) {
          clearInterval(this.timer);
          this.timer = null;
        }
        console.log('倒计时开始')
        this.canGetCode = false;
        // 这里放这句，是为了一开始时就提示，否则要等setInterval的1秒后才会有提示
        this.changeEvent(this.changeText.replace(/x|X/, this.secNum));
        this.setTimeToStorage();
        this.timer = setInterval(() => {
          if (--this.secNum) {
            // 用当前倒计时的秒数替换提示字符串中的"x"字母
            this.changeEvent(this.changeText.replace(/x|X/, this.secNum));
          } else {
            clearInterval(this.timer);
            this.timer = null;
            this.changeEvent(this.endText);
            this.secNum = this.seconds;
            this.canGetCode = true;
            console.log('倒计时结束')
          }
        }, 1000);
      },
      // 重置，可以让用户再次获取验证码
      reset() {
        this.canGetCode = true;
        clearInterval(this.timer);
        this.secNum = this.seconds;
        this.changeEvent(this.endText);
      },
      changeEvent(text) {
        this.tips = text
      },
      // 保存时间戳，为了防止倒计时尚未结束，H5刷新或者各端的右上角返回上一页再进来
      setTimeToStorage() {
        if(!this.keepRunning || !this.timer) return;
        // 记录当前的时间戳，为了下次进入页面，如果还在倒计时内的话，继续倒计时
        // 倒计时尚未结束，结果大于0；倒计时已经开始，就会小于初始值，如果等于初始值，说明没有开始倒计时，无需处理
        if(this.secNum > 0 && this.secNum <= this.seconds) {
          // 获取当前时间戳(+ new Date()为特殊写法)，除以1000变成秒，再去除小数部分
          const nowTimestamp = Math.floor((+ new Date()) / 1000);
          // 将本该结束时候的时间戳保存起来 => 当前时间戳 + 剩余的秒数
          this.$setStorage(this.timestamp, nowTimestamp + Number(this.secNum))
        }
      }
    }
  }
</script>

<style scoped>

</style>
