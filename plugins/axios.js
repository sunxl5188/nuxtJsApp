export default function ({ $axios, redirect, store }) {
  $axios.setHeader('Accept', 'application/json, text/plain, */*')
  $axios.setHeader('Content-type', 'application/x-www-form-urlencoded;charset=UTF-8')
  $axios.setToken(store.state.token)
  $axios.onRequest((config) => {
    config.timeout = 5000
    config.responsetype = 'json'
    config.responseEncoding = 'utf8'
    config.withCredentials = false
  })
  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      redirect('/400')
    }
  })
  $axios.onResponse((response) => {
    return response
  })
}
