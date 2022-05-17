import modules from './modules'
import { getPrefix } from '@/static/js/utils'

const PREFIX = getPrefix()
const hasLogin = `${PREFIX}hasLogin`

const state = () => ({
  vuex_token: '',
  vuex_user: ''
})

const mutations = {
  /**
   * 页面刷新后初始化信息，读取本地存储
   * @param state
   */
  initState (state) {
    state.vuex_token = this.$getStorage('token')
    state.vuex_user = this.$getStorage('user')
  },
  // 用户登录
  signIn (state, data) {
    this.$cookies.set(hasLogin, 1, 60 * 30)
    state.vuex_token = data.token
    state.vuex_user = data.user
    for (const key in data) {
      this.$setStorage(key, data[key])
    }
  },
  signOut (state) {
    this.$cookies.remove(hasLogin)
    state.vuex_token = ''
    state.vuex_user = ''
  },
  $uStore (state, payload) {
    // 判断是否多层级调用，state中为对象存在的情况，诸如user.info.score = 1
    const nameArr = payload.name.split('.')
    let saveKey = ''
    const len = nameArr.length
    if (len >= 2) {
      let obj = state[nameArr[0]]
      for (let i = 1; i < len - 1; i++) {
        obj = obj[nameArr[i]]
      }
      obj[nameArr[len - 1]] = payload.value
      saveKey = nameArr[0]
    } else {
      // 单层级变量，在state就是一个普通变量的情况
      state[payload.name] = payload.value
      saveKey = payload.name
    }
    // 保存变量到本地
    this.$setStorage(saveKey, state[saveKey])
  }
}

const actions = {
  asySignIn ({ commit }, data) {
    commit('signIn', data)
  },
  asySignOut ({ commit }) {
    commit('signOut')
  }
}

const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
  modules
}
