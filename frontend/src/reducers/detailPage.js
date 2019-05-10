import { fromJS } from 'immutable'
import { GET_POST, GET_COMMENTS } from '../actions/detailPage'

const defaultState = fromJS({
  post: {},
  comments: [],
  isLoading: true
})

export default function detailData(state = defaultState, action) {
  switch (action.type) {
    case GET_POST:
      return state.merge({
        post: fromJS(action.post),
        isLoading: action.isLoading
      })
    case GET_COMMENTS:
      return state.set('comments', fromJS(action.comments))
    default:
      return state
  }
}
