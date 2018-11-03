import { fromJS } from 'immutable'
import { GET_CATEGORIES, GET_POSTS, CHANGE_SORT, GET_MODIFY_POST } from '../actions'

let postsDefault = fromJS({
  categories: [],
  posts: [],
  comments: [],
  modifyPost: {},
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
    case GET_MODIFY_POST:
      return state.set('modifyPost', action.post)
    default:
      return state
  }
}
