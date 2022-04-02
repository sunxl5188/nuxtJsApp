import Vue from 'vue'
import home from './api/home'
import article from './api/article'
const self = new Vue()

export default function ({ store, redirect, req, router, app: { $axios } }, inject) {
  $axios.defaults.timeout = 5000
  $axios.setToken(store.state.token)
  $axios.setHeader('token', store.state.token)
  $axios.setHeader('Content-Type', 'application/json')

  $axios.interceptors.request.use(config => {
    return config
  }, err => Promise.reject(err))

  $axios.interceptors.response.use(response => {
    return response
  })

  // 添加拦截器,执行优行级高于$axios.interceptors
  $axios.onRequest(config => {
    // 客户端下，请求进度条开始
    if (process.client && self) {
      self.$nuxt.$loading.start()
    }
    config.responsetype = 'json'
    config.responseEncoding = 'utf8'
    config.withCredentials = false
    return config
  })

  // 返回结果拦截器
  $axios.onResponse(response => {
    const { data } = response
    switch (data.status) {
      case 401:
        redirect('/error/401')
        break
    }
    if(process.client && self){
      self.$nuxt.$loading.finish()
    }
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
    if(process.client && self){
      self.$nuxt.$loading.fail(error)
    }
    return error
  })

  $axios.onRequestError(error => {
    // todo：先输入错误信息，看以后是否用得到
    console.log(error)
    return error
  })

  $axios.onResponseError(error => {
    // todo：先输入错误信息，看以后是否用得到
    console.log(error)
    return error
  })

  // 处理返回成功数据
  const onResponse = (response, resolve) => {
    if (response.status === 200 && response.data !== null) {
      if (response.data.status === 1) {
        resolve(response.data)
      }
    }
  }

  // 封装访问方法
  const http = {
    /**
     * @get方法~查询数据
     * @param url
     * @param params
     * @returns {Promise<unknown>}
     */
    $fetch (url, params = {}) {
      return new Promise((resolve, reject) => {
        $axios.get(url, { params })
          .then(response => onResponse(response, resolve))
          .catch(error => reject(error))
      })
    },
    /**
     * @post方法~添加数据
     * @param url
     * @param params
     * @returns {Promise<unknown>}
     */
    $post (url, params = {}) {
      return new Promise((resolve, reject) => {
        $axios.post(url, params)
          .then(response => onResponse(response, resolve))
          .catch(error => reject(error))
      })
    },
    /**
     * @put方法~修改数据:将所有数据都推送到后端
     * @param url
     * @param params
     * @returns {Promise<unknown>}
     */
    $put (url, params ={}) {
      return new Promise((resolve, reject) => {
        $axios.put(url, params)
          .then(response => onResponse(response, resolve))
          .catch(error => reject(error))
      })
    },
    /**
     * @patch~修改数据：只将修改的数据推送到后端
     * @param url
     * @param params
     */
    $patch (url, params = {}) {
      return new Promise((resolve, reject) => {
        $axios.patch(url, params)
          .then(response => onResponse(response, resolve))
          .catch(error => reject(error))
      })
    },

    /**
     * @delete~用于删除数据
     * @param url
     * @param params
     */
    $del (url, params = {}) {
      return new Promise((resolve, reject) => {
        $axios.delete(url, { data: params })
          .then(response => onResponse(response, resolve))
          .catch(error => reject(error))
      })
    }
  }

  // ================================================
  const API_MODULES = {}
  API_MODULES.home = home(http)
  API_MODULES.article = article(http)

  inject('api', API_MODULES)
}
