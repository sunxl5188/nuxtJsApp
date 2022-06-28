export default ({ store, route, redirect }) => {
  route.matched.forEach((item, index) => {
    const data = route.meta[index]
    item.meta.title = data.title || ''

    if (route.meta[index].redirect) {
      item.redirect = data.redirect // 设置重定向
    }
  })
}

