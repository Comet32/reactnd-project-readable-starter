import { getCategoriesAPI, getPostsAPI } from '../utils/api'

// 获取分类
export const GET_CATEGORIES = 'GET_CATEGORIES'
export function getCategories() {
  return dispatch => {
    getCategoriesAPI().then(res => {
      dispatch({
        type: GET_CATEGORIES,
        categories: res
      })
    })
  }
}

// 根据传入参数获取帖子
export const GET_POSTS = 'GET_POSTS'
export function getPosts(cate) {
  return dispatch => {
    getPostsAPI(cate).then(res => {
      dispatch({
        type: GET_POSTS,
        posts: res
      })
    })
  }
}

// 改变排列顺序
export const CHANGE_SORT = 'CHANGE_SORT'
export function changePostSort(sort) {
  return {
    type: CHANGE_SORT,
    sort
  }
}
