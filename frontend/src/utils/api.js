const api = 'http://localhost:3001'

const headers = { 'Authorization': 'whatever-you-want' }


export function getCategoriesAPI() {
  return fetch(`${api}/categories`, { headers }).then(res => res.json()).then(data => data.categories)
}

export function getPostsAPI(cate) {
  let newApi = ''
  if (!cate || cate === 'all') {
    newApi = `${api}/posts`
  } else {
    newApi = `${api}/${cate}/posts`
  }
  return fetch(newApi, { headers }).then(res => res.json())
}

export function postPostsAPI(body) {
  return fetch(`${api}/posts`, {
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(body)
  }).then(res => res.json())
}

export function deletePostAPI(id) {
  return fetch(`${api}/posts/${id}`, { headers, method:'DELETE' })
}

export function changePostVoteAPI(option,id){
  return fetch(`${api}/posts/${id}`, {
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({
      option
    })
  }).then(res => res.json())
}
