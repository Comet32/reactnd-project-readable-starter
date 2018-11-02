import { fromJS } from 'immutable'
import { GET_CATEGORIES, GET_POSTS } from '../actions'

let postsDefault = fromJS({
  categories: [],
  posts: [],
  comments: []
})

export default function postsData(state = postsDefault, action) {
  switch (action.type) {
    case GET_CATEGORIES:
      return state.set('categories', action.categories)
    case GET_POSTS:
      return state.set('posts', action.posts)
    default:
      return state
  }
}
