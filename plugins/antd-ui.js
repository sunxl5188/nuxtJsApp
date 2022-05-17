import Vue from 'vue'
import {
  message,
  notification,
  Modal,
  Button,
  ConfigProvider,
  Layout,
  Input,
  Form,
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
  FormModel,
  Badge,
  Tabs,
  Tag,
  Card,
  Checkbox,
  Radio,
  Cascader, Menu, Icon
} from 'ant-design-vue'

const components = [
  ConfigProvider, Layout, Button, Form, FormModel, Input, Modal, DatePicker, TimePicker, Space, Avatar, Dropdown, Breadcrumb, Row, Col, Progress, List, Popconfirm, Table, Badge, Tabs, Tag, Card, Checkbox, Radio, Cascader, Menu, Icon
]

for (const component of components) {
  Vue.use(component)
}

export default ({ app }, inject) => {
  inject('message', message)
  inject('notification', notification)
  inject('confirm', Modal.confirm)
}
