// router/index.js
// 引入path
import path from 'path'

// 要使用 process.cwd()
const resolve = (pagePath) => path.resolve(process.cwd(), `./${pagePath}`)

// 下面这种方式不可取
// const resolve = (pagePath) => path.resolve(__dirname, pagePath)

// router/index.js
// 简单定义一下
export const $routes = [
  {
    path: '/',
    name: 'Home',
    component: resolve('pages/home/index.vue'),
    meta: {
      title: '首页',
      icon: 'icon-home'
    }
  },
  {
    path: '/dashboard',
    component: resolve('pages/dashboard/index.vue'),
    meta: {
      title: '控制台',
      icon: 'icon-dashboard'
    },
    children: [
      {
        path: '',
        name: 'dashboard-cloud',
        component: resolve('pages/dashboard/cloud/index.vue'),
        meta: {
          title: '云云云',
          icon: 'icon-cloud'
        }
      }
    ]
  }
]
