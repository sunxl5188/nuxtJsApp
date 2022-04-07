import modules from './modules'

let PREFIX = ''
if (process.env.NODE_ENV === 'development') {
  PREFIX = process.env.NUXT_ENV_DEVELOPMENT_PREFIX
} else {
  PREFIX = process.env.NUXT_ENV_PRODUCTION_PREFIX
}

// 需要永久存储，且下次APP启动需要取出的，在state中的变量名
const saveStateKeys = ['vuex_user', 'vuex_token']

// 保存变量到本地存储中
const saveLifeData = function (self, key, value) {
  // 判断变量名是否在需要存储的数组中
  if (saveStateKeys.includes(key)) {
    // 获取本地存储的lifeData对象，将变量添加到对象中
    let tmp = self.$getStorage('lifeData')
    // 第一次打开APP，不存在lifeData变量，故放一个{}空对象
    tmp = tmp || {}
    tmp[key] = value
    // 执行这一步后，所有需要存储的变量，都挂载在本地的lifeData对象中
    self.$setStorage('lifeData', tmp)
  }
}

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
    const lifeData = this.$getStorage('lifeData') || ''
    if(lifeData){
      state.vuex_token = lifeData.vuex_token ? lifeData.vuex_token : ''
      state.vuex_user = lifeData.vuex_user ? lifeData.vuex_user : ''
    }
  },
  // 用户登录
  signIn (state, data) {
    this.$cookies.set(PREFIX + 'hasLogin', 1)
    state.vuex_token = data.token
    state.vuex_user = data.user
    for (const dataKey in data) {
      saveLifeData(this, 'vuex_' + dataKey, data[dataKey])
    }
  },
  signOut (state) {
    this.$cookies.remove(PREFIX + 'hasLogin')
    state.vuex_token = ''
    state.vuex_user = {}
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
    // 保存变量到本地，见顶部函数定义
    saveLifeData(this, saveKey, state[saveKey])
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
