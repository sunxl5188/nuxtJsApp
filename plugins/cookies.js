import VueCookies from 'vue-cookies'

export default ({ app }, inject) => {
  inject('cookies', VueCookies)
}
