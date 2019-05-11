import { fromJS } from 'immutable'
import { CHANGE_TITLE, CHANGE_BODY, INI_MODIFY, CHANGE_ID } from '../actions/editPage'

const defaultState = fromJS({
  title: '',
  author: '',
  category: '',
  body: ''
})

export default function editData(state = defaultState, action) {
  switch (action.type) {
    case INI_MODIFY:
      return fromJS(action.value)
    case CHANGE_TITLE:
      return state.set('title', action.value)
    case CHANGE_BODY:
      return state.set('body', action.value)
    case CHANGE_ID:
      return state.set('id', action.id)
    default:
      return state
  }
}
