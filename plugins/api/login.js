export default http => ({
  signIn (username, password) {
    return new Promise((resolve, reject) => {
      http.$post('/index/index/login', {username, password}).then(res=>{
        resolve(res)
      })
    })
  }
})
