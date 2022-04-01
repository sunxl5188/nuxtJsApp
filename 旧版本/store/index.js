const state = () => ({
  token: '',
  user: {}
})

const mutations = {
  // 用户登录
  signIn (state, data) {
    state.token = data.token
    state.user = data.user
  },
  signOut (state) {
    state.token = ''
    state.user = {}
  },
  upToken (state, data) {
    state.token = data
  }
}

const actions = {
}

const getters = {}

export default {
  state,
  mutations,
  actions,
  getters
}
