import Vue from 'vue'

export default function ({$axios, redirect}) {
  const token = Vue.$cookies.get('token') || ''
  $axios.setHeader('Accept', 'application/json, text/plain, */*')
  $axios.setHeader('Content-type', 'application/x-www-form-urlencoded;charset=UTF-8')
  //$axios.setHeader('token', token)
  $axios.setToken(token)
  $axios.onRequest(config => {
    config.timeout = 5000
    config.responsetype = 'json'
    config.responseEncoding = 'utf8'
    config.withCredentials = false
  })
  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      redirect('/400')
    }
  })
  $axios.onResponse(response => {
    // console.log(response)
    return response
  })
}
