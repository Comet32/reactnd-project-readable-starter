import { getPostAPI } from '../utils/api'

export const GET_POST = 'GET_POST'
export function getPost(id){
  return dispatch => {
    getPostAPI(id).then(res => {
      dispatch({
        type: GET_POST,
        post: res
      })
    })
  }
}
