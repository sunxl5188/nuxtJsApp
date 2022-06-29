import { getPrefix } from '@/assets/js/utils'

/**
 * 存储localStorage
 */
export default ({ app }, inject) => {
  const PREFIX = getPrefix()
  const lifeData = `${PREFIX}lifeData`

  const getTemp = () => {
    let temp = localStorage.getItem(lifeData)
    if (Object.prototype.toString.call(temp) === '[object Null]') {
      temp = {}
    }
    if (Object.prototype.toString.call(temp) === '[object String]') {
      temp = JSON.parse(temp)
    }
    return temp
  }
  /**
   * 设置本地存储值
   * @param name 需要存储的名称
   * @param value 存储值
   */
  const setStorage = (name, value) => {
    if (!name) return
    const temp = getTemp()
    temp[name] = value
    localStorage.setItem(lifeData, JSON.stringify(temp))
  }

  /**
   * @获取本地缓存
   * @param name 需要获取的名称，支持多级 如user.info.score
   * @returns {string}
   */
  const getStorage = name => {
    if (!name) return

    let temp = getTemp()
    const nameArr = name.split('.')
    const len = nameArr.length
    if (len >= 2) {
      for (const i in nameArr) {
        temp = temp[nameArr[i]] || ""
      }
    } else {
      temp = temp[name] || ""
    }
    return temp
  }

  /**
   * 删除localStorage
   */
  const remStorage = name => {
    if (!name) return
    const temp = getTemp()
    delete temp[name]
    localStorage.setItem(lifeData, JSON.stringify(temp))
  }

  inject('setStorage', setStorage)
  inject('getStorage', getStorage)
  inject('remStorage', remStorage)
}
