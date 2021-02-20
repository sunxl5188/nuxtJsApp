const webpack = require('webpack')
module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: '网站标题',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no'},
      {hid: 'keywords', name: 'keywords', content: '网站关键字'},
      {hid: 'description', name: 'description', content: '网站描述'}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
    ],
    script: [
      {src: '/js/jquery.js'},
      {src: '/js/popper.js'},
      {src: '/js/bootstrap.js'},
      {src: '/js/laydate/laydate.js'}
    ]
  },
  css: [
    '@/assets/css/bootstrap.css',
    '@/node_modules/swiper/swiper.less',
    '@/static/js/laydate/theme/default/laydate.css',
    '@/assets/css/main.less'
  ],
  plugins: [
    {src: '~/plugins/axios', ssr: false},
    {src: '~plugins/swiper.js', ssr: false},
    {src: '~plugins/vueFilter.js', ssr: false},
    {src: '~plugins/layui.js', ssr: false},
    {src: '~plugins/lodash.js', ssr: false},
    {src: '~plugins/BaiduMap.js', ssr: false},
    {src: '~plugins/cookies.js', ssr: false}
  ],
  /*
  ** Customize the progress bar color
  */
  loading: {color: '#3b8070'},
  /*
  ** Build configuration
  */
  build: {
    plugins: [
      new webpack.ProvidePlugin({})
    ],
    /*
    ** Run ESLint on save
    */
    extend (config, {isDev, isClient}) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    vendor: ['swiper'],
    extractCSS: {allChunks: true}
  },
  modules: [
    ['@nuxtjs/dotenv', {filename: '.env.production'}],
    '@nuxtjs/axios'
  ],
  axios: {
    baseURL: 'http://www.api.me/index/index/'
  }
}

