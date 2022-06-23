import { getCookiesInServer, getPrefix } from '@/assets/js/utils'

export default function ({ route, req, res, redirect, app }) {
  const isClient = process.client
  const isServer = process.server
  const cookieName = getPrefix() + 'hasLogin'
  let hasLogin
  console.log('%c开始验证登录状态', 'background: #000000;color: #ffffff;padding: 2px 4px;border-radius: 4px;font-size: 10px;')
  // 在服务端
  if (isServer) {
    // 获取服务端cookie
    const cookies = getCookiesInServer(req)
    // 获取当前服务端cookie中是否含有token字段
    hasLogin = cookies[cookieName] ? cookies[cookieName] : ''
  }
  // 在客户端
  if (isClient) {
    // 获取客户端（本地）cookie中的token字段
    hasLogin = app.$cookies.get(cookieName)
  }
  // 判断是否获取到token
  // 未获取到，重定向到登陆页面
  if (!+hasLogin) {
    redirect('/admin/login')
  }
}
