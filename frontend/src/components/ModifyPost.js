import React, { Component } from 'react'
import { message, Input, Radio, Button } from 'antd'
import { modifyPost, getPostAPI } from '../utils/api'
import { connect } from 'react-redux'
import { changeCateIndex } from '../actions/header'
import { changeBody, changeTitle, IniModify } from '../actions/modifyPage'

const { TextArea } = Input

class CreatePost extends Component {
  state = {
    count: 0
  }

  componentDidMount() {
    this.props.changeCateIndex(5)
    const id = this.props.post.id
    getPostAPI(id).then(res => {
      this.props.IniModify(res)
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    // 表单验证
    const titleInput = this.titleInput.input.value
    const bodyInput = this.bodyInput.textAreaRef.value

    if (!titleInput.trim()) {
      message.error('标题不能为空', 2)
      return
    }

    if (!bodyInput.trim()) {
      message.error('内容不能为空', 2)
      return
    }

    // 提交表单
    const id = this.props.post.id
    const body = {
      title: this.titleInput.input.value,
      body: this.bodyInput.textAreaRef.value
    }
    console.log(body)
    modifyPost(id, body).then(res => {
      console.log(res)
      this.props.history.push('')
      this.props.changeCateIndex(0)
    })
  }

  render() {
    const { post } = this.props

    return (
      <div style={{ width: '70%', margin: '0 auto' }}>
        <div style={{ marginBottom: 16, width: '50%' }}>
          <Input
            value={post.title}
            addonBefore="标题："
            placeholder="请输入标题，不能为空"
            onChange={e => this.props.changeTitle(e.target.value)}
            ref={input => (this.titleInput = input)}
          />
        </div>
        <div style={{ marginBottom: 16, width: '25%' }}>
          <Input
            value={post.author}
            addonBefore="用户："
            disabled
            placeholder="请输入用户名，不能为空"
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <span
            style={{
              display: 'inline-block',
              marginLeft: '12px',
              marginRight: '12px'
            }}
          >
            类别：
          </span>
          <Radio.Group disabled value={post.category} buttonStyle="solid">
            <Radio.Button value="react">React</Radio.Button>
            <Radio.Button value="redux">Redux</Radio.Button>
            <Radio.Button value="udacity">Udacity</Radio.Button>
          </Radio.Group>
        </div>
        <div style={{ marginBottom: '20px' }}>
          <span style={{ display: 'inline-block', marginLeft: '12px' }}>
            内容：
          </span>
          <TextArea
            value={post.body}
            rows={4}
            style={{ marginTop: '10px' }}
            placeholder="请输入内容，不能为空"
            onChange={e => this.props.changeBody(e.target.value)}
            ref={input => (this.bodyInput = input)}
          />
        </div>
        <div style={{ textAlign: 'center' }}>
          <Button onClick={this.handleSubmit} type="primary" size="large">
            确定修改
          </Button>
        </div>
      </div>
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
