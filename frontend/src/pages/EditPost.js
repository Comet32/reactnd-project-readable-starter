import React, { Component } from 'react'
import { message} from 'antd'
import { modifyPost, getPostAPI } from '../utils/api'
import { connect } from 'react-redux'
import { changeCateIndex } from '../actions/header'
import { changeBody, changeTitle, IniModify } from '../actions/editPage'

import PostForm from '../components/PostForm'

class CreatePost extends Component {
  state = {
    count: 0
  }

  componentDidMount() {
    // 使分类的高亮消失
    this.props.changeCateIndex(null)
    const id = this.props.match.params.id
    getPostAPI(id).then(res => {
      this.props.IniModify(res)
    })
  }

  handleChangeInput = e => {
    const { changeBody, changeTitle } = this.props
    const name = e.target.name
    const value = e.target.value
    if (name === 'title') {
      changeTitle(value)
    } else if (name === 'body') {
      changeBody(value)
    }
  }

  handleSubmit = e => {
    e.preventDefault()
    const { post } = this.props
    // 表单验证
    const title = post.title
    const content = post.body

    if (!title.trim()) {
      message.error('标题不能为空', 2)
      return
    }

    if (!content.trim()) {
      message.error('内容不能为空', 2)
      return
    }

    // 提交表单
    const id = this.props.post.id
    const body = {
      title: title,
      body: content
    }
    modifyPost(id, body).then(res => {
      //回到首页
      this.props.history.push('/')
      //高亮显示页头中的 'All'
      this.props.changeCateIndex(0)
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

const mapDispatch = dispatch => ({
  IniModify(post) {
    dispatch(IniModify(post))
  },
  changeCateIndex(num) {
    dispatch(changeCateIndex(num))
  },
  changeBody(value) {
    dispatch(changeBody(value))
  },
  changeTitle(value) {
    dispatch(changeTitle(value))
  }
})

export default connect(
  mapState,
  mapDispatch
)(CreatePost)
