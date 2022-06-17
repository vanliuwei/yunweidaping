export const doCustomTimes = (times, callback) => {
  let i = -1
  while (++i < times) {
    callback(i)
  }
}

export const objEqual = (obj1, obj2) => {
  const keysArr1 = Object.keys(obj1)
  const keysArr2 = Object.keys(obj2)
  if (keysArr1.length !== keysArr2.length) return false
  else if (keysArr1.length === 0 && keysArr2.length === 0) return true
  else return !keysArr1.some(key => obj1[key] !== obj2[key])
}

// export const msgInfo = (type, content, closable = false) => {
//   this.$Message[type]({
//     background: true,
//     closable: closable,
//     content: content,
//     duration: 6
//   })
// }
export function arrToDic (list) {
  let dic = {}
  for (let item in list) {
    dic[list[item].enumKey] = list[item].enumValue
  }
  return dic
}
export function optionList (list) {
  return list.map(element => {
    element['value'] = element.enumValue
    element['key'] = element.enumKey
    return element
  })
}
