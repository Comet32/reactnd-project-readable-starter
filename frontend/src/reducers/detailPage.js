import { fromJS } from 'immutable'
import { GET_POST } from '../actions/detailPage'

const defaultState = fromJS({
  post: {},
  comments: []
})

export default function detailData(state = defaultState, action) {
  switch (action.type) {
    case GET_POST:
      return state.set('post',fromJS(action.post))
    default:
      return state
  }
}
