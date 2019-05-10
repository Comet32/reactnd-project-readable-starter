import React, { Component } from 'react'
import { Button, Divider, Input, Card, message } from 'antd'
import {
  changeCommentVoteAPI,
  changeCommentBodyAPI,
  DeleteCommentAPI
} from '../utils/api'
import { connect } from 'react-redux'
import { getComments } from '../actions/detailPage'
import deleteConfirm from './DeleteConfirm'

const { TextArea } = Input

class CommentItem extends Component {
  state = {
    isEdit: false,
    body: '',
    vote: ''
  }

  componentDidMount() {
    this.setState({
      body: this.props.item.body,
      vote: this.props.item.voteScore
    })
  }

  handleChangeEdit = e => {
    e.preventDefault()
    this.setState(
      {
        isEdit: true
      },
      () => {
        this.textInput && this.textInput.focus()
      }
    )
  }

  handleChangeText = e => {
    this.setState({
      body: e.target.value
    })
  }

  handleUpVote = option => {
    this.setState(state => ({
      vote: option === 'upVote' ? ++state.vote : --state.vote
    }))
    changeCommentVoteAPI(this.props.item.id, option)
  }

  handleConfirmModify = (id, body) => {
    if (body.trim() === '') {
      message.error('评论不能为空', 2)
      return
    }
    changeCommentBodyAPI(id, body).then(res => {
      this.setState({
        isEdit: false
      })
    })
  }

  handleDeleteComment = (e, id, pID) => {
    e.preventDefault()
    deleteConfirm(id, this.handleOk, pID)
  }

  handleOk = (id, pID) => {
    DeleteCommentAPI(id).then(res => {
      this.props.dispatch(getComments(pID))
      message.success('删除成功',2);
    })
  }

  render() {
    const { isEdit, body, vote } = this.state
    const { item, parentID } = this.props
    return (
      <Card
        style={{ marginBottom: '20px' }}
        type="inner"
        title={item.author}
        extra={
          <>
            <a
              href=" "
              style={isEdit ? { color: '#333' } : null}
              onClick={this.handleChangeEdit}
            >
              Edit
            </a>
            <Divider type="vertical" />
            <a
              href=" "
              onClick={e => this.handleDeleteComment(e, item.id, parentID)}
            >
              Delete
            </a>
          </>
        }
      >
        {isEdit ? (
          <TextArea
            ref={textInput => (this.textInput = textInput)}
            placeholder="Inner Card content"
            onChange={this.handleChangeText}
            value={body}
          />
        ) : (
          body
        )}
        <div style={{ marginTop: '20px' }}>
          <span style={{ marginRight: '10px' }}>投票得分：{vote}</span>{' '}
          <Button
            onClick={() => {
              this.handleUpVote('upVote')
            }}
            style={{ marginRight: '5px' }}
            type="primary"
            shape="circle"
            icon="like"
            size="small"
          />
          <Button
            onClick={() => {
              this.handleUpVote('downVote')
            }}
            type="primary"
            shape="circle"
            icon="dislike"
            size="small"
          />
          {isEdit ? (
            <Button
              onClick={() => {
                this.handleConfirmModify(item.id, body)
              }}
              style={{ float: 'right' }}
              type="primary"
              size="default"
            >
              确定修改
            </Button>
          ) : null}
        </div>
      </Card>
    )
  }
}

export default connect()(CommentItem)
