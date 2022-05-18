export default http => ({
  signIn (params) {
    return new Promise((resolve, reject) => {
      http.$post('/index/index/login', params).then(res=>{
        resolve(res)
      })
    })
  }
})
