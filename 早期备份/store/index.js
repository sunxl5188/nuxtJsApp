const state = () => ({
  token: '',
  user: {}
})

const actions = {
  signIn (content, data) {
    content.commit('_signIn', data)
  },
  signOut (content) {
    content.commit('_signOut')
  },
  upUser (content, data) {
    content.commit('_user', data)
  },
  upToken (content, data) {
    content.commit('_token', data)
  }
}

const mutations = {
  // 用户登录
  _signIn (state, data) {
    this._vm.$cookies.set('user', data.user, 0)
    this._vm.$cookies.set('token', data.token, 0)
    state.token = data.token
    state.user = data.user
  },
  _signOut (state) {
    this._vm.$cookies.remove('user')
    this._vm.$cookies.remove('token')
    state.token = ''
    state.user = {}
  },
  _user (state, data) {
    state.user = data
  },
  _token (state, data) {
    console.log(data)
    state.token = data
  }
}

const getters = {}

export default {
  namespace: true,
  state,
  mutations,
  actions,
  getters
}
