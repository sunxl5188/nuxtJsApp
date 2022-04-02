export default http => ({
  getList (params) {
    return new Promise((resolve) => {
      http.$fetch('/admin/mirror/bannerList', params).then(res => {
        if(res.status === 1){
          resolve(res)
        }
      })
    })
  },
  getDetail (params) {
    return new Promise((resolve) => {
      http.get('', params).then(res => {
        if(res.status === 1){
          resolve(res)
        }
      })
    })
  },
  submitData (params) {
    return new Promise((resolve) => {
      http.post(params).then(res => {
        if(res.status === 1){
          resolve(res)
        }
      })
    })
  }
})
