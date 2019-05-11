import { fromJS } from 'immutable'
import { GET_CATEGORIES, GET_POSTS, CHANGE_SORT } from '../actions/postList'

let postsDefault = fromJS({
  categories: [],
  posts: [],
  postSort: 'voteScore'
})

export default function postsData(state = postsDefault, action) {
  switch (action.type) {
    case GET_CATEGORIES:
      return state.set('categories', action.categories)
    case GET_POSTS:
      return state.set('posts', action.posts)
    case CHANGE_SORT:
      return state.set('postSort', action.sort)
    default:
      return state
  }
}
