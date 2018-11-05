import { Button, Divider, Input, Card } from 'antd'
import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { changePostVoteAPI, deletePostAPI } from '../utils/api'

import { changeID } from '../actions/modifyPage'
import { changeCateIndex } from '../actions/header'

import { getPost } from '../actions/detailPage'

const { TextArea } = Input

class PostDetail extends Component {
  componentDidMount() {
    const id = this.props.match.params.id
    this.props.dispatch(getPost(id))
    this.props.dispatch(changeCateIndex(5))
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

  render() {
    const { post, dispatch } = this.props
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
                  style={{ width: '30%' }}
                  id="commentAuthor"
                  placeholder="请输入作者名称"
                />
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label htmlFor="commentBody">评论内容：</label>
                <TextArea
                  style={{ width: '70%' }}
                  id="commentBody"
                  rows={4}
                  placeholder="请输入内容"
                />
              </div>
              <div style={{ textAlign: 'center' }}>
                <Button type="primary" size="large">
                  发表评论
                </Button>
              </div>
              <Divider style={{ fontSize: '20px' }}>评 论</Divider>
              <div>
                <Card
                  type="inner"
                  title="Inner Card title"
                  extra={
                    <Fragment>
                      <a href=" ">Edit</a>
                      <Divider type="vertical" />
                      <a href=" ">Delete</a>
                    </Fragment>
                  }
                >
                  <TextArea
                    placeholder="Inner Card content"
                    value="Inner Card content"
                  />
                  <Button style={{float:'right',marginTop:'10px'}} type="primary" size="default">
                    确定修改
                  </Button>
                </Card>
                <Card
                  style={{ marginTop: 16 }}
                  type="inner"
                  title="Inner Card title"
                  extra={<a href=" ">More</a>}
                >
                  Inner Card content
                </Card>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
}

const mapState = state => ({
  post: state.getIn(['detailData', 'post']).toJS()
})

export default connect(mapState)(PostDetail)
