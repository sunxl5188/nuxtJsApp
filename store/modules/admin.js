const state = () => ({
  vuex_menu: {
    collapsed: false,
    selectedKeys: [],
    openKeys: [],
    list: []
  },
  searchFold: false, // 表格筛选展开收起状态
  user: {
    info: {
      data: {
        status: 1
      }
    }
  }
})

export default {
  namespaced: true,
  state,
  getters: {},
  mutations: {
    $aStore (state, payload) {
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
  },
  modules: {}
}
