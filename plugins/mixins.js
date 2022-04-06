import Vue from 'vue'
import vuexStore from '@/store/vuex.mixin'

if (!Vue.__my_mixin__) {
  Vue.__my_mixin__ = true
  Vue.mixin(vuexStore) // Set up your mixin then
}
