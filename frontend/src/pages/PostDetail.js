import { message, Button, Divider, Input } from 'antd'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Loading from 'react-loading'

import CommentItem from '../components/CommentItem'
import NoMatch from './NoMatch'
import { changePostVoteAPI, deletePostAPI, addCommentAPI } from '../utils/api'
import { random24 } from '../utils/helpers'
import deleteConfirm from '../components/DeleteConfirm'

// actions
import { changeID } from '../actions/modifyPage'
import { changeCateIndex } from '../actions/header'
import { getPost, getComments } from '../actions/detailPage'

const { TextArea } = Input

class PostDetail extends Component {
  componentDidMount() {
    const id = this.props.match.params.id
    this.props.dispatch(getPost(id))
    this.props.dispatch(changeCateIndex(5))
    this.props.dispatch(getComments(id))
  }

  componentWillUnmount() {
    const id = this.props.match.params.id
    this.props.dispatch(getComments(id))
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

  handleDeletePost = (e, id) => {
    e.preventDefault()
    deleteConfirm(id, this.handleOk)
  }

  handleOk = id => {
    deletePostAPI(id).then(res => {
      this.props.history.push('')
      message.success('删除成功',2);
    })
  }

  handleSubmitComment = () => {
    // 表单验证
    let bodyValue = this.bodyInput.textAreaRef.value
    let authorVlaue = this.authorInput.input.value
    debugger
    if (authorVlaue.trim() === '') {
      message.error('作者名称不能为空', 2)
      return
    }
    if (bodyValue.trim() === '') {
      message.error('评论内容不能为空', 2)
      return
    }

    // 向服务器提交表单
    addCommentAPI({
      id: random24(),
      timestamp: Date.now(),
      body: bodyValue,
      author: this.authorInput.input.value,
      parentId: this.props.match.params.id
    }).then(res => {
      this.bodyInput.textAreaRef.value = ''
      this.authorInput.input.value = ''
      this.props.dispatch(getComments(this.props.match.params.id))
      this.props.dispatch(getPost(this.props.match.params.id))
      message.success('发表成功')
    })
  }

  render() {
    const { post, dispatch, comments, isLoading } = this.props

    return (
      <div style={{ width: '70%', margin: '0 auto' }}>
        {isLoading ? (
          <div className="loading">
            <Loading type="spin" color="#041427" />
          </div>
        ) : post.id === undefined ? (
          <NoMatch />
        ) : (
          <div>
            <div className="detail-postTitle">{post.title}</div>
            <Divider />
            <div className="cf">
              <span className="detail-postAuthor">{post.author}</span>
              <span className="detail-postTime">
                {this.switchTime(post.timestamp)}
              </span>
            </div>
            <div className="detail-postBody">{post.body}</div>
            <div className="detail-postInfo">
              <span style={{ marginRight: '20px' }}>
                投票得分：
                {post.voteScore}
              </span>
              <Button
                onClick={() => this.changePostVote('upVote', post.id)}
                style={{ marginRight: '10px' }}
                type="primary"
                shape="circle"
                icon="like"
                size="default"
              />
              <Button
                onClick={() => this.changePostVote('downVote', post.id)}
                style={{ marginRight: '50px' }}
                type="primary"
                shape="circle"
                icon="dislike"
                size="default"
              />
              <span>
                评论数量：
                {post.commentCount}
              </span>
              <span className="detail-postAction">
                <Link
                  to="/modify-post"
                  onClick={e => {
                    dispatch(changeID(post.id))
                  }}
                >
                  Edit
                </Link>
                <Divider type="vertical" />
                <a
                  href=" "
                  onClick={e => {
                    this.handleDeletePost(e, post.id)
                  }}
                >
                  Delete
                </a>
              </span>
            </div>
            <Divider style={{ fontSize: '20px' }}>发 表 评 论</Divider>
            <div>
              <div style={{ marginBottom: '20px' }}>
                <label htmlFor="commentAuthor">作者名称：</label>
                <Input
                  ref={authorInput => (this.authorInput = authorInput)}
                  style={{ width: '30%' }}
                  id="commentAuthor"
                  placeholder="请输入作者名称"
                />
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label htmlFor="commentBody">评论内容：</label>
                <TextArea
                  ref={bodyInput => (this.bodyInput = bodyInput)}
                  style={{ width: '70%' }}
                  id="commentBody"
                  rows={4}
                  placeholder="请输入内容"
                />
              </div>
              <div style={{ textAlign: 'center' }}>
                <Button
                  onClick={() => {
                    this.handleSubmitComment()
                  }}
                  type="primary"
                  size="large"
                >
                  发表评论
                </Button>
              </div>
              <Divider style={{ fontSize: '20px' }}>评 论</Divider>
              <div>
                {comments.map(item => (
                  <CommentItem
                    parentID={this.props.match.params.id}
                    item={item}
                    key={item.id}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
}

const mapState = state => ({
  post: state.getIn(['detailData', 'post']).toJS(),
  comments: state
    .getIn(['detailData', 'comments'])
    .toJS()
    .reverse(),
  isLoading: state.getIn(['detailData', 'isLoading'])
})

export default connect(mapState)(PostDetail)
