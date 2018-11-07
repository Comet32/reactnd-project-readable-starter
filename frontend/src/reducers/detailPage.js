import { fromJS } from 'immutable'
import { GET_POST, GET_COMMENTS } from '../actions/detailPage'

const defaultState = fromJS({
  post: {},
  comments: []
})

export default function detailData(state = defaultState, action) {
  switch (action.type) {
    case GET_POST:
      return state.set('post', fromJS(action.post))
    case GET_COMMENTS:
      return state.set('comments', fromJS(action.comments))
    default:
      return state
  }
}
