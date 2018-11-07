import { message,Button, Divider, Input } from 'antd'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import CommentItem from './CommentItem'
import { changePostVoteAPI, deletePostAPI, addCommentAPI } from '../utils/api'
import { random24 } from '../utils/helpers'

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
    deletePostAPI(id).then(res => {
      this.props.history.push('')
    })
  }

  handleSubmitComment = (that) => {
    let bodyValue = that.bodyInput.textAreaRef.value
    let authorVlaue = that.authorInput.input.value
    if(!authorVlaue.trim()){
      message.error('作者名称不能为空',2)
      return
    }
    if(!bodyValue.trim()){
      message.error('评论内容不能为空',2)
      return
    }
    addCommentAPI({
      id: random24(),
      timestamp: Date.now(),
      body: bodyValue,
      author: that.authorInput.input.value,
      parentId: that.props.match.params.id
    }).then(res => {
      that.bodyInput.textAreaRef.value = ''
      that.authorInput.input.value = ''
      that.props.dispatch(getComments(that.props.match.params.id))
      that.props.dispatch(getPost(that.props.match.params.id))
    })
  }

  render() {
    const { post, dispatch, comments } = this.props

    return (
      <div style={{ width: '70%', margin: '0 auto' }}>
        {post.id === undefined ? (
          '此帖子已被删除'
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
                  当前得分：
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
                    ref={authorInput => this.authorInput = authorInput}
                    style={{ width: '30%' }}
                    id="commentAuthor"
                    placeholder="请输入作者名称"
                  />
                </div>
                <div style={{ marginBottom: '20px' }}>
                  <label htmlFor="commentBody">评论内容：</label>
                  <TextArea
                    ref={bodyInput => this.bodyInput = bodyInput}
                    style={{ width: '70%' }}
                    id="commentBody"
                    rows={4}
                    placeholder="请输入内容"
                  />
                </div>
                <div style={{ textAlign: 'center' }}>
                  <Button onClick={()=>{this.handleSubmitComment(this)}} type="primary" size="large">
                    发表评论
                </Button>
                </div>
                <Divider style={{ fontSize: '20px' }}>评 论</Divider>
                <div>
                  {comments.map(item => <CommentItem parentID={this.props.match.params.id} item={item} key={item.id} />)}
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
  comments: state.getIn(['detailData', 'comments']).toJS().reverse()
})

export default connect(mapState)(PostDetail)
