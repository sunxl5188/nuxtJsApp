const obj1 = {
  show: true,
  type: 'category',
  boundaryGap: false,
  data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
}

const obj2 = { show: false }

console.log(Object.assign(obj1, obj2))
console.log(obj1)
