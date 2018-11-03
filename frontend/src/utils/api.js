const api = 'http://localhost:3001'

const headers = { Authorization: 'whatever-you-want' }

// 获取帖子的分类
export function getCategoriesAPI() {
  return fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories)
}

// 获取不同的类型的帖子
export function getPostsAPI(cate) {
  let newApi = ''
  if (!cate || cate === 'all') {
    newApi = `${api}/posts`
  } else {
    newApi = `${api}/${cate}/posts`
  }
  return fetch(newApi, { headers }).then(res => res.json())
}

// 获取某一个帖子
export function getPostAPI(id) {
  return fetch(`${api}/posts/${id}`, { headers }).then(res => res.json())
}

// 修改帖子
export function modifyPost(id,body) {
  return fetch(`${api}/${id}`, {
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    method: 'PUT',
    body: JSON.stringify(body)
  }).then(res => res.json())
}

// 添加帖子
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

// 删除帖子
export function deletePostAPI(id) {
  return fetch(`${api}/posts/${id}`, { headers, method: 'DELETE' })
}

// 改变帖子的票数
export function changePostVoteAPI(option, id) {
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
