import Vue from 'vue'
import Load from '~/components/MyLoading'

const Mask = Vue.extend(Load)

const toggleLoading = (el, binding, vnode) => {
  if (binding.value) {
    Vue.nextTick(() => {
      el.instance.loading = true// 控制loading组件显示
      el.insertBefore(el.mask, el.childNodes[0])// 插入到目标元素前面
      // el.appendChild(el.mask)
    })
  } else {
    el.instance.loading = false
  }
}

export default Vue.directive('load', {
  // bind(){}当绑定指令的时候出发
  bind (el, binding, vnode) {
    const mask = new Mask({
      el: document.createElement('div')
    })
    el.instance = mask
    el.mask = mask.$el
    el.maskStyle = {}
    binding.value && toggleLoading(el, binding, vnode)
  },
  // update(){}当数据更新时候会触发该函数
  update (el, binding, vnode) {
    if (binding.oldValue !== binding.value) {
      toggleLoading(el, binding, vnode)
    }
  },
  // unbind(){}解绑的时候触发该函数
  unbind (el) {
    if (el.instance) {
      el.instance.$destroy()
    }
  }
})
