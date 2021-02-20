import Vue from 'vue'
import VueCookies from 'vue-cookies'

Vue.use(VueCookies)
let DOMAIN = ''
if (process.browser) {
  const host = window.location.hostname
  DOMAIN = /^localhost|\d/.test(host) ? host : host.substring(host.indexOf('.') + 1)
}
// default: expireTimes = 1d, path = '/', domain = '', secure = '', sameSite = 'Lax'
Vue.$cookies.config(0, '/', DOMAIN)
