import { Button, Divider } from 'antd'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { changeID } from '../actions/modifyPage'
import { changePostVoteAPI } from '../utils/api'

import { getPost } from '../actions/detailPage'

class PostDetail extends Component {
  componentDidMount() {
    const id = this.props.match.params.id
    this.props.dispatch(getPost(id))
  }

  switchTime = t => {
    const date = new Date(t)
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    return `${year}年${month}月${day}日`
  }

  changePostVote = (option, id) => {
    changePostVoteAPI(option, id).then(res => {
      this.props.dispatch({
        type: 'GET_POST',
        post: res
      })
    })
  }


  render() {
    const { post, dispatch } = this.props
    return (
      <div style={{ width: '70%', margin: '0 auto' }}>
        <div className='detail-postTitle'>{post.title}</div>
        <Divider />
        <div className='cf'>
          <span className='detail-postAuthor'>{post.author}</span>
          <span className='detail-postTime'>{this.switchTime(post.timestamp)}</span>
        </div>
        <div className="detail-postBody">{post.body}</div>
        <div className='detail-postInfo'>
          <span style={{ marginRight: '20px' }}>当前得分：{post.voteScore}</span>
          <Button
            onClick={()=> this.changePostVote('upVote',post.id)}
            style={{ marginRight: '10px' }}
            type="primary"
            shape="circle"
            icon="like"
            size="default"
          />
          <Button
            onClick={()=> this.changePostVote('downVote',post.id)}
            style={{ marginRight: '50px' }}
            type="primary"
            shape="circle"
            icon="dislike"
            size="default"
          />
          <span>评论数量：{post.commentCount}</span>
          <span className="detail-postAction">
            <Link to='/modify-post' onClick={(e) => {
              dispatch(changeID(post.id))
            }}>Edit</Link>
            <Divider type="vertical" />
            <a href=" ">
              Delete
            </a>
          </span>
        </div>
        <Divider style={{ fontSize: '20px' }}>评 论</Divider>
      </div>
    )
  }
}

const mapState = (state) => ({
  post: state.getIn(['detailData', 'post']).toJS()
})

export default connect(mapState)(PostDetail)
