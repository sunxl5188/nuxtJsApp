import Vue from 'vue'
import * as _ from 'lodash'
import moment from 'moment'
import 'moment/locale/zh-cn'
import nation from '~/static/json/nation.json'
import cityList from '~/static/json/cityjson.json'
moment.locale('zh_cn')

Vue.prototype.dateFormat = (date, pattern = 'YYYY-MM-DD HH:mm:ss') => {
  return moment(date).format(pattern)
}

Vue.prototype.currentTime = function (type, times) {
  const date = times === undefined || times === '' ? new Date() : new Date(times)
  const Y = date.getFullYear()
  let M = date.getMonth() + 1
  let D = date.getDate()
  let HH = date.getHours()
  let MM = date.getMinutes()
  let SS = date.getSeconds()
  M = M < 10 ? '0' + M : M
  D = D < 10 ? '0' + D : D
  HH = HH < 10 ? '0' + HH : HH
  MM = MM < 10 ? '0' + MM : MM
  SS = SS < 10 ? '0' + SS : SS
  switch (type) {
    case 1:
      return Y + '-' + M + '-' + D + ' ' + HH + ':' + MM + ':' + SS
    case 2:
      return Y + '-' + M + '-' + D + ' ' + HH + ':' + MM
    default:
      return Y + '-' + M + '-' + D
  }
}

Vue.prototype.countdownInit = function (objName) {
  const self = this
  const dateBegin = Vue.$cookies.get(objName + '-expires')
  if (dateBegin) {
    const dateEnd = new Date()
    const dateDiff = dateBegin - dateEnd.getTime()
    const leave1 = dateDiff % (24 * 3600 * 1000)
    const leave2 = leave1 % (3600 * 1000)
    // let minutes = Math.floor(leave2 / (60 * 1000)) 分
    const leave3 = leave2 % (60 * 1000)
    const seconds = Math.round(leave3 / 1000) // 秒
    if (seconds > 0) {
      self.countdown(objName, seconds)
    } else {
      Vue.$cookies.remove(objName + '-expires')
    }
  }
}

Vue.prototype.countdown = function (objName, wait) {
  const self = this
  const _this = document.getElementById(objName)
  const date = new Date()
  date.setTime(date.getTime() + (wait + 1) * 1000)
  if (Vue.$cookies.get(objName + '-expires') === null) {
    Vue.$cookies.set(objName + '-expires', new Date(date).getTime())
  }
  if (_this) {
    if (wait >= 0) {
      Vue.$cookies.set(objName, wait - 1, date)
    } else {
      Vue.$cookies.set(objName, wait - 1, date)
    }
    if (wait <= 0) {
      Vue.$cookies.remove(objName)
      Vue.$cookies.remove(objName + '-expires')
    }
    if (wait === 0) {
      _this.innerHTML = '重获验证码'
      _this.classList.remove('disabled')
      _this.removeAttribute('disabled')
    } else {
      _this.innerHTML = wait + '秒后重新获取'
      _this.classList.add('disabled')
      _this.setAttribute('disabled', true)
      wait--
      setTimeout(function () {
        self.countdown(objName, wait)
      }, 1000)
    }
  }
}

Vue.prototype.highlight = function (str, keys) {
  if (keys) {
    return str.replace(new RegExp(keys, 'ig'), matchedTxt => '<span style="color:#f90;">' + matchedTxt + '</span>')
  } else {
    return str
  }
}

Vue.prototype.cutString = (strings, k) => {
  if (strings == null) { return false }
  const reg = /<[^>]*>/
  let len = 0
  const str = strings.replace(reg, strings)
  for (let i = 0; i < str.length; i++) {
    const c = str.charCodeAt(i)
    // 单字节加1
    if ((c >= 0x0001 && c <= 0x007E) || (c >= 0xFF60 && c <= 0xFF9F)) {
      len++
    } else {
      len += 2
    }
  }
  if (len > k) {
    return strings.substr(0, k) + '...'
  } else {
    return strings
  }
}

Vue.prototype.checkNumber = (event, len) => {
  if (event.target.value) {
    const str = event.target.value.replace(/[^\d]/g, '')
    event.target.value = str.substr(0, len)
  }
}

Vue.prototype.fileSuffix = (name) => {
  return (name.substring(name.lastIndexOf('.') + 1)).toLocaleLowerCase()
}

Vue.prototype.cityTransForm = (p, c, a) => {
  let str = ''
  const citys = cityList.citylist
  if (p !== undefined || p !== '') {
    for (let i = 0; i < citys.length; i++) {
      if (citys[i].area_id === p) {
        const cityArr = citys[i].child
        str = citys[i].title
        if (c !== undefined || c !== '') {
          for (let k = 0; k < cityArr.length; k++) {
            if (cityArr[k].area_id === c) {
              const areaArr = cityArr[k].child
              str += ' ' + cityArr[k].title
              if (a !== undefined || a !== '') {
                for (let n = 0; n < areaArr.length; n++) {
                  if (areaArr[n].area_id === a) {
                    str += ' ' + areaArr[n].title
                  }
                }
              }
            }
          }
        }
      }
    }
    return str
  }
}

Vue.filter('bytesToSize', function (bytes) {
  if (bytes === 0) { return '0 B' }
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  const sz = (bytes / Math.pow(k, i)).toFixed(2)
  return sz + ' ' + sizes[i]
})

Vue.filter('keepNum', (v, i) => {
  const val = Number(v)
  return val.toFixed(i)
})

Vue.filter('cutString', (strings, k) => {
  if (strings == null) { return false }
  const reg = /<[^>]*>/
  let len = 0
  const str = strings.replace(reg, strings)
  for (let i = 0; i < str.length; i++) {
    const c = str.charCodeAt(i)
    // 单字节加1
    if ((c >= 0x0001 && c <= 0x007E) || (c >= 0xFF60 && c <= 0xFF9F)) {
      len++
    } else {
      len += 2
    }
  }
  if (len > k) {
    return strings.substr(0, k) + '...'
  } else {
    return strings
  }
})

Vue.filter('countryActive', (value) => {
  if (value === undefined || value === '') {
    return ''
  } else {
    const resArr = _.filter(nation, item => item.id === parseInt(value))
    return resArr[0].cn
  }
})

Vue.filter('countryList', (value) => {
  if (value === undefined || value === '') {
    return ''
  } else {
    const str = []
    const arr = _.filter(nation, function (o) {
      return value.includes(o.id) || value.includes(o.id.toString())
    })
    for (let i = 0; i < arr.length; i++) {
      str.push(arr[i].cn)
    }
    return str.join(',')
  }
})

Vue.filter('plusXin', function (str, frontLen, endLen) {
  const len = str.length - frontLen - endLen
  let xin = ''
  for (let i = 0; i < len; i++) {
    xin += '*'
  }
  return str.substr(0, frontLen) + xin + str.substr(str.length - endLen)
})

Vue.filter('dCreateTime', (value, format) => {
  const D = new Date(value)
  const o = {
    'M+': D.getMonth() + 1,
    'd+': D.getDate(),
    'h+': D.getHours(),
    'm+': D.getMinutes(),
    's+': D.getSeconds()
  }
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (D.getFullYear() + '').substr(4 - RegExp.$1.length))
    for (const k in o) {
      if (new RegExp(`(${k})`).test(format)) {
        format = format.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
      }
    }
    return format
  }
})
