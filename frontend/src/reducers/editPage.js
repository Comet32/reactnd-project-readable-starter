import { fromJS } from 'immutable'
import { INI_MODIFY, CHNAGE_VALUE } from '../actions/editPage'

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
    case CHNAGE_VALUE:
      return state.set(action.name, action.value)
    default:
      return state
  }
}
