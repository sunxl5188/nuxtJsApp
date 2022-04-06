import Vue from 'vue'
import {
  Message, MessageBox, Notification,
  Button,
  Card,
  Form,
  FormItem,
  Input,
  InputNumber,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Avatar,
  Main,
  Table,
  Row,
  Col,
  Radio, Checkbox, Select, Loading
} from 'element-ui'
import lang from 'element-ui/lib/locale/lang/zh-CN'
import locale from 'element-ui/lib/locale'

// configure language
locale.use(lang)

const components = [Button, Card, Form, FormItem, Input, InputNumber, Dropdown, DropdownItem, DropdownMenu, Avatar, Main, Table, Row, Col, Radio, Checkbox, Select]

for (const component of components) {
  Vue.use(component)
}
Vue.component(Message.name, Message)

Vue.use(Loading.directive)
Vue.prototype.$loadingOptions = {
  lock: true,
  text: '拼命加载中',
  spinner: 'el-icon-loading',
  background: 'rgba(0, 0, 0, 0.8)'
}

Vue.prototype.$loading = Loading.service
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$notify = Notification
Vue.prototype.$message = Message
