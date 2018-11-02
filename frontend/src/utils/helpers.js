// 传入字符串 => 首字母大写
export function capitalize(str = '') {
  return typeof str !== 'string'
    ? ''
    : str[0].toUpperCase() + str.slice(1)
}

// 字符 => 对应数字
export function strToIndex(str) {
  switch (str) {
    case '':
      return 0
    case 'react':
      return 1
    case 'redux':
      return 2
    case 'udacity':
      return 3
    default:
      return 4;
  }
}

// 随机生成 24 位 带有 0-9 与 a-z 的字符串
export function random24(){
  let num8 =  Math.random().toString(16).substr(-8)
  return num8 + num8 + num8
}
