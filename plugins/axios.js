export default function ({ store, redirect, req, router, app: { $axios }}) {
  $axios.defaults.timeout = 5000
  $axios.setToken(store.state.token)
  $axios.setHeader('token', store.state.token)
  $axios.setHeader('Content-Type', 'application/json')

  $axios.interceptors.request.use(config => {
    console.log(config, '-----')
    return config
  }, err => Promise.reject(err))

  $axios.interceptors.response.use(response => {
    console.log(response, '+++++')
    return response
  })

  // 添加拦截器
  $axios.onRequest(config => {
    // 客户端下，请求进度条开始
    if (process.client === true) {
      console.log(1)
    }
    config.responsetype = 'json'
    config.responseEncoding = 'utf8'
    config.withCredentials = false
    console.log(config)
    return config
  })

  // 返回结果拦截器
  $axios.onResponse(response => {
    console.log(response, '+++++')
    return response
  })

  // 拦截错误信息
  $axios.onError(error => {
    switch (error.response.status) {
      case 401: // 返回401，token验证失败
        redirect('/error/401')
        break
      case 404:
        redirect('/error/404')
        break
      case 500:
        redirect('/error/500')
        break
    }
    return error
  })
}
