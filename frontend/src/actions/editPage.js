export const CHNAGE_VALUE = 'CHNAGE_VALUE'
export function changeValue(name, value){
  return {
    type: CHNAGE_VALUE,
    name,
    value
  }
}

// 获取需要改变的帖子
export const INI_MODIFY = 'INI_MODIFY'
export function IniModify(data) {
  const {title, author, category, body} = data
  return {
    type: INI_MODIFY,
    value:{
      title,
      author,
      category,
      body
    }
  }
}
