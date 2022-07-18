export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: '网站标题',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no'
      },
      { hid: 'description', name: 'description', content: '网站描述' },
      { hid: 'keywords', name: 'keywords', content: '网站关键字' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [
      { src: '/js/jquery.js' },
      { src: '/js/popper.min.js' },
      { src: '/js/bootstrap.min.js' },
      { src: '/js/mCustomScrollbar/jquery.mCustomScrollbar.js' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    { src: '~/assets/bootstrap/bootstrap.scss', lang: 'scss' },
    { src: '~/assets/css/main.scss', lang: 'scss' },
    { src: '~/static/js/mCustomScrollbar/jquery.mCustomScrollbar.css', lang: 'css' }
  ],

  loading: {
    color: 'blue',
    failedColor: 'red',
    height: '3px'
  },
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/antd-ui',
    // { src: '@/plugins/antd-ui', mode: 'server' },
    { src: '@/plugins/axios', mode: 'client' },
    { src: '@/plugins/cookies', mode: 'client' },
    { src: '@/plugins/storage', mode: 'client' },
    { src: '@/plugins/components', mode: 'client' },
    { src: '@/plugins/directive/load', mode: 'client' },
    { src: '@/plugins/lodash', mode: 'client' },
    { src: '@/plugins/BaiduMap', mode: 'client' },
    { src: '@/plugins/mixins', mode: 'client' },
    { src: '@/plugins/vue-masonry', mode: 'client' },
    { src: '@/plugins/moment', mode: 'client' },
    { src: '@/plugins/charts', mode: 'client' }
  ],

  // 自动导入组件: https://go.nuxtjs.dev/config-components
  components: true,

  // 开发和构建模块 (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/style-resources'
  ],
  styleResources: {
    // scss: '~/assets/css/_variables.scss'
  },
  buildDir: 'nuxt-dist',
  server: {
    host: '0.0.0.0', // 默认: localhost
    port: '3000' // 默认端口号
  },
  cli: {
    bannerColor: 'yellow'
  },
  env: {
    baseUrl: process.env['NUXT_ENV_' + process.env.NODE_ENV.toUpperCase() + '_BASE_URL']
  },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    proxy: true,
    prefix: '/api',
    credentials: true,
    retry: { retries: 3 }
  },
  proxy: {
    '/api': {
      target: process.env['NUXT_ENV_' + process.env.NODE_ENV.toUpperCase() + '_PROXY'],
      pathRewrite:
        {
          '^/api': '',
          changeOrigin: true,
        }
    }
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    // analyze: false, // 分析并可视化构建后的打包文件
    extractCSS: true, // 使用 Vue 服务器端渲染指南启用常见 CSS 提取
    // transpile: [/ant-design-vue/],
    vendor: ['axios'], // 为防止重复打包
    styleResources: {
      scss: '~/assets/css/_variables.scss'
    },
    babel: {
      plugins: [
        [
          'import',
          {
            libraryName: 'ant-design-vue',
            libraryDirectory: 'es',
            style: 'css' // 如果需要使用 less 方式去按需加载的话，则需要改为 true ，并且添加下面loaders 配置
          },
          'ant-design-vue'
        ]
      ]
    },
    transpile: [
      "ant-design-vue"
    ]
    // 此处是 style 为 true 时所需添加的配置
    // loaders: {
    //   less: {
    //     modifyVars: {
    //       'primary-color': '#1DA57A',
    //       'link-color': '#1DA57A',
    //       'border-radius-base': '2px',
    //     }
    //   }
    // }
  },
  router: {
    // 在每页渲染前运行 middleware/unknownRoute.js 中间件的逻辑
    middleware: 'unknownRoute',
    routeNameSplitter: '-',
    extendRoutes (routes, resolve) {
      routes.push({
          name: 'error',
          path: '*',
          component: resolve(__dirname, 'pages/error/404.vue')
        })
    }
  }
}
