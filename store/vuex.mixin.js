import { mapState } from 'vuex'
import store from '@/store'

// 尝试将用户在根目录中的store/index.js的vuex的state变量，全部加载到全局变量中
let $uStoreKey = []
let $uStoreHome = []
let $uStoreSetting = []
let count = 0
try {
  $uStoreKey = store.state ? Object.keys(store.state()) : []
  if(store.modules){
    $uStoreHome = store.modules.home.state() ? Object.keys(store.modules.home.state()) : []
    $uStoreSetting = store.modules.setting.state() ? Object.keys(store.modules.setting.state()) : []
  }
} catch (e) {

}

export default {
  beforeCreate () {
    if (count === 0) {
      // 将vuex方法挂在到$vuex中
      // 使用方法为：如果要修改vuex的state中的user.name变量为"史诗" => this.$vuex('user.name', '史诗')
      // 如果要修改vuex的state的version变量为1.0.1 => this.$vuex('version', '1.0.1')
      this.$vuex = (name, value) => {
        this.$store.commit('$uStore', {
          name, value
        })
      }
    }
    count++
  },
  computed: {
    // 将vuex的state中的所有变量，解构到全局混入的mixin中
    ...mapState($uStoreKey),
    ...mapState('home', $uStoreHome),
    ...mapState('setting', $uStoreSetting)
  }
}

