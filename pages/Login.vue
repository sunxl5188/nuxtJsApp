<template>
  <client-only>
    <a-layout class="login">
      <a-layout-header>
        <div class="logo">
          <router-link to='/'>
            <img src="@/assets/images/logo.jpg" alt="logo"/>
          </router-link>
        </div>
        <div></div>
      </a-layout-header>
      <a-layout-content>
        <div class="loginTable">
          <div class="loginTableLeft"></div>
          <div class="loginTableRight">
            <h4>后台管理系统</h4>
            <a-form-model
              ref="myform"
              layout="horizontal"
              :model="myform"
              :rules="rules"
              class="pt-50"
              @submit.prevent="submitSave"
            >
              <a-form-model-item prop="username">
                <a-input v-model="myform.username" size="large" placeholder="请输入登录账号">
                  <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)"/>
                </a-input>
              </a-form-model-item>
              <a-form-model-item prop="password">
                <a-input-password v-model="myform.password" size="large" allow-clear placeholder="请输入登录密码">
                  <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)"/>
                </a-input-password>
              </a-form-model-item>
              <a-form-model-item>
                <a-button type="primary" size="large" :loading="loading" block html-type="submit">登录</a-button>
              </a-form-model-item>
            </a-form-model>
          </div>
        </div>
      </a-layout-content>
      <a-layout-footer>
        <div class="footer-nav">
          <a href="javascript:void(0);">关于我们</a>
          <span class="pl-10 pr-10">|</span>
          <a href="javascript:void(0);">联系我们</a>
          <span class="pl-10 pr-10">|</span>
          <a href="javascript:void(0);">人才招聘</a>
          <span class="pl-10 pr-10">|</span>
          <a href="javascript:void(0);">商家入驻</a>
          <span class="pl-10 pr-10">|</span>
          <a href="javascript:void(0);">广告服务</a>
          <span class="pl-10 pr-10">|</span>
          <a href="javascript:void(0);">友情链接</a>
          <span class="pl-10 pr-10">|</span>
          <a href="javascript:void(0);">销售联盟</a>
        </div>
        <div><small>浙ICP备11003236号 浙公网安备 33010602010533号 已通过 ISO27001:2013 信息安全认证</small></div>
        <div><small>违法和不良信息举报 举报邮箱：admin@XXX.com</small></div>
      </a-layout-footer>
    </a-layout>
  </client-only>
</template>

<script>
  export default {
    name: 'LogIn',
    data () {
      return {
        loading: false,
        myform: {
          username: '孙悟空',
          password: '123456',
          avatar: require('@/assets/images/avatar.jpg')
        },
        rules: {
          username: [
            { required: true, message: '请输入登录账号' },
            { min: 3, max: 15, message: '账号长度为3~15个字符' }
          ],
          password: [
            { required: true, message: '请输入登录密码' },
            { min: 6, max: 18, message: '密码长度为6~18个字符' }
          ]
        }
      }
    },
    methods: {
      submitSave () {
        this.loading = true
        this.$refs.myform.validate((valid) => {
          if (valid) {
            this.$api.login.signIn(this.myform).then(res => {
              if (res.status === 1) {
                this.$store.dispatch('asySignIn', res.data)
                this.$nextTick(() => {
                  this.$router.push('/admin')
                })
              }
              this.loading = false
            })
          } else {
            this.loading = false
            console.log('error submit!!')
            return false
          }
        })
      }
    }
  }
</script>
<style scoped lang="scss">
  .login {
    min-width: 1200px;
    min-height: 100%;

    & .ant-layout-header {
      background-color: #ffffff;
      display: flex;
      justify-content: space-between;
      align-items: center;

      & .logo {
        width: 200px;
        height: 40px;

        & img {
          vertical-align: initial;
        }
      }
    }

    & .ant-layout-footer {
      text-align: center;
      background: #ffffff;
    }

    & .ant-layout-content {
      display: flex;
      display: -webkit-flex;
      justify-content: center;
      align-items: center;

      & .loginTable {
        width: 1000px;
        height: 480px;
        background: #ffffff;
        box-shadow: 1px 0 5px 3px #e3e5e8;
        -webkit-border-radius: 8px;
        -moz-border-radius: 8px;
        border-radius: 8px;
        overflow: hidden;

        & .loginTableLeft {
          float: left;
          width: 55%;
          height: 100%;
          background-image: url('../assets/images/login_bg.png');
          background-size: auto 100%;
          background-repeat: no-repeat;
          background-position: center center;
        }

        & .loginTableRight {
          float: right;
          width: 45%;
          height: 100%;
          padding: 30px 50px;

          & h4 {
            font-size: 26px;
            text-align: center;
          }
        }
      }
    }
  }
</style>
