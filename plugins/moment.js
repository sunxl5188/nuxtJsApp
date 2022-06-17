import moment from 'moment'
import 'moment/locale/zh-cn'

export default ({ app }, inject) => {
  inject('moment', moment)
}
