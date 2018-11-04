export const CHANGE_TITLE = 'CHANGE_TITLE'
export function changeTitle(value) {
  return {
    type: CHANGE_TITLE,
    value
  }
}

export const CHANGE_BODY = 'CHANGE_BODY'
export function changeBody(value) {
  return {
    type: CHANGE_BODY,
    value
  }
}

export const CHANGE_ID = 'CHANGE_ID'
export function changeID(id){
  return {
    type: CHANGE_ID,
    id
  }
}

// 获取需要改变的帖子
export const INI_MODIFY = 'INI_MODIFY'
export function IniModify(value) {
  return {
    type: INI_MODIFY,
    value
  }
}
