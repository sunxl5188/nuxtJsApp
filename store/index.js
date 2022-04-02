const state = () => ({
  token: 'gratest_1326C18D9903C79B2CEC301BA740357D',
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
