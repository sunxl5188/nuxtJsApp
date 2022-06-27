export default ({store, route, redirect}) => {
  route.matched.forEach((item, index) => {
    item.meta.title = route.meta[index].title || '';
    if(route.meta[index].redirect){
      item.meta.redirect = route.meta[index].redirect; // 设置重定向
    }
  })
}

