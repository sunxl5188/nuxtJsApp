/**
 * 未知路由重定向 404页面
 * @param store
 * @param route
 * @param redirect
 */
export default ({store, route, redirect}) => {
  console.log(route.matched)
  if (!route.matched.length) {
    redirect('/404')
  }
}

