import React, { Component } from 'react'
import { message } from 'antd'
import { random24 } from '../utils/helpers'
import { postPostsAPI } from '../utils/api'
import { changeCateIndex } from '../actions/header'
import { connect } from 'react-redux'

import PostForm from '../components/PostForm'

class CreatePost extends Component {
  state = {
    title: '',
    author: '',
    category: '',
    body: ''
  }

  handleChangeInput = e => {
    const name = e.target.name
    const value = e.target.value
    this.setState({
      [name]: value
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    // 表单验证
    const { title, author, category, body } = this.state

    if (!title.trim()) {
      message.error('标题不能为空', 2)
      return
    }

    if (!author.trim()) {
      message.error('作者名称不能为空', 2)
      return
    }

    if (!category.trim()) {
      message.error('请选择帖子所属类别', 2)
      return
    }

    if (!body.trim()) {
      message.error('内容不能为空', 2)
      return
    }

    //提交表单
    const bodyApi = {
      id: random24(),
      timestamp: Date.now(),
      title,
      body,
      author,
      category
    }
    postPostsAPI(bodyApi).then(
      res => {
        this.props.history.push('/')
        this.props.dispatch(changeCateIndex(0))
        message.success('创建成功', 2)
      },
      () => {
        message.error('创建失败', 2)
      }
    )
  }

  render() {
    return (
      <PostForm
        {...this.state}
        onChangeInput={this.handleChangeInput}
        onSubmit={this.handleSubmit}
      />
    )
  }
}

export default connect()(CreatePost)
