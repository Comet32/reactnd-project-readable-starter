import React, { Component } from 'react'
import { message } from 'antd'
import { modifyPost, getPostAPI } from '../utils/api'
import { connect } from 'react-redux'
import { changeCateIndex } from '../actions/header'
import { changeValue, IniModify } from '../actions/editPage'

import PostForm from '../components/PostForm'

class CreatePost extends Component {
  componentDidMount() {
    // 使分类的高亮消失
    this.props.dispatch(changeCateIndex(null))
    const id = this.props.match.params.id
    getPostAPI(id).then(res => {
      this.props.dispatch(IniModify(res))
    })
  }

  handleChangeInput = e => {
    const name = e.target.name
    const value = e.target.value
    this.props.dispatch(changeValue(name, value))
  }

  handleSubmit = e => {
    e.preventDefault()
    const { title, body } = this.props.post

    if (!title.trim()) {
      message.error('标题不能为空', 2)
      return
    }

    if (!body.trim()) {
      message.error('内容不能为空', 2)
      return
    }

    // 提交表单
    const id = this.props.match.params.id
    const bodyApi = {
      title,
      body
    }
    modifyPost(id, bodyApi).then(res => {
      //回到首页
      this.props.history.push('/')
      //高亮显示页头中的 'All'
      this.props.dispatch(changeCateIndex(0))
      //提示修改成功
      message.success('修改成功', 2)
    })
  }

  render() {
    const { post } = this.props

    return (
      <PostForm
        {...post}
        isEdit={true}
        onChangeInput={this.handleChangeInput}
        onSubmit={this.handleSubmit}
      />
    )
  }
}

const mapState = state => ({
  post: state.get('modifyData').toJS()
})

export default connect(mapState)(CreatePost)
