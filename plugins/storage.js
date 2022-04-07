/**
 * @param {String} name [储存的名字]
 * @param {String} content [储存的值]
 */
/**
 * 存储localStorage
 */
export default ({ app }, inject) => {
  let PREFIX
  if (process.env.NODE_ENV === 'development') {
    PREFIX = process.env.NUXT_ENV_DEVELOPMENT_PREFIX
  }else{
    PREFIX = process.env.NUXT_ENV_PRODUCTION_PREFIX
  }
  const setStore = (name, content) => {
    if (!name) return
    if (typeof content !== 'string') {
      content = JSON.stringify(content)
    }
    localStorage.setItem(PREFIX + name, content)
  }

  /**
   * 获取localStorage
   */
  const getStore = name => {
    if (!name) return
    let content = localStorage.getItem(PREFIX + name)
    if (content !== undefined) {
      content = JSON.parse(content)
    } else {
      content = ''
    }
    return content
  }

  /**
   * 删除localStorage
   */
  const reStore = name => {
    if (!name) return
    localStorage.removeItem(PREFIX + name)
  }

  inject('setStore', setStore)
  inject('getStore', getStore)
  inject('reStore', reStore)
}