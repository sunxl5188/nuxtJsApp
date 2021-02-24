export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: '网站标题',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no' },
      { hid: 'keywords', name: 'keywords', content: '网站关键字' },
      { hid: 'description', name: 'description', content: '网站描述' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: []
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'ant-design-vue/dist/antd.css',
    'element-ui/lib/theme-chalk/index.css',
    '~/assets/css/admin.less'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '@/plugins/jquery', ssr: false },
    { src: '@/plugins/layui', ssr: false },
    { src: '@/plugins/BaiduMap', ssr: false },
    '@/plugins/antd-ui',
    '@/plugins/element-ui',
    '@/plugins/axios',
    '@/plugins/cookies',
    '@/plugins/swiper',
    '@/plugins/filter'
  ],
  loading: { color: '#3b8070' },
  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    ['@nuxtjs/dotenv', {
      filename: process.env.NODE_ENV === 'development' ? '.env.development' : '.env.production'
    }],
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: { baseURL: 'http://www.api.me/index/index/' },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    analyze: true,
    transpile: [/^element-ui/]
  }
}
