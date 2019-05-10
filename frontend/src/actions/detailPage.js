import { getPostAPI,getCommentsAPI } from '../utils/api'

export const GET_POST = 'GET_POST'
export function getPost(id){
  return dispatch => {
    getPostAPI(id).then(res => {
      dispatch({
        type: GET_POST,
        post: res,
        isLoading: false
      })
    })
  }
}

export const GET_COMMENTS = 'GET_COMMENTS'
export function getComments(id){
  return dispatch => {
    getCommentsAPI(id).then(res => {
      dispatch({
        type: GET_COMMENTS,
        comments: res
      })
    })
  }
}
