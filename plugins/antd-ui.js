import Vue from 'vue'
import {
  message,
  notification,
  Modal,
  Button,
  ConfigProvider,
  Layout,
  Form,
  FormModel,
  Input,
  Select,
  DatePicker,
  TimePicker,
  Space,
  Avatar,
  Dropdown,
  Breadcrumb,
  Row,
  Col,
  Progress,
  List,
  Popconfirm,
  Table,
  Badge,
  Tabs,
  Tag,
  Card,
  Checkbox,
  Radio,
  Cascader, Menu, Icon, Spin, InputNumber
} from 'ant-design-vue'

const components = [
  ConfigProvider, Layout, Button, Form, FormModel, Input, Select, Modal, DatePicker, TimePicker, Space, Avatar, Dropdown, Breadcrumb, Row, Col, Progress, List, Popconfirm, Table, Badge, Tabs, Tag, Card, Checkbox, Radio, Cascader, Menu, Icon, Spin, InputNumber
]

for (const component of components) {
  Vue.use(component)
}

export default ({ app }, inject) => {
  inject('message', message)
  inject('notification', notification)
  inject('confirm', Modal.confirm)
  inject('info', Modal.info)
  inject('success', Modal.success)
  inject('error', Modal.error)
  inject('warning', Modal.warning)
}
