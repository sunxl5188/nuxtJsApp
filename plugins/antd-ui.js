import Vue from 'vue'
import { Button, Modal, message, ConfigProvider, Layout } from 'ant-design-vue'

const components = [
  ConfigProvider,
  Layout,
  Button,
  Modal
]

for (const component of components) {
  Vue.use(component)
}

Vue.prototype.$message = message

export default ({ app }, inject) => {
  inject("message", message)
}
