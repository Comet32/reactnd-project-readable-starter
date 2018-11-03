import React, { Component } from 'react'
import { Input, Radio, Button } from 'antd'
import { modifyPost, getPostAPI } from '../utils/api'
import { connect } from 'react-redux'
import { changeCateIndex } from '../actions/header'
import { getModifyPost } from '../actions/index'

const { TextArea } = Input

class CreatePost extends Component {
  componentDidMount() {
    this.props.changeCateIndex(5)
    const id = this.props.match.params.id
    getPostAPI(id).then(res => {
      this.props.getModifyPost(res)
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    const body = {
      title: this.titleInput.input.value,
      body: this.bodyInput.textAreaRef.value
    }
    console.log(body)
    modifyPost(body).then(res => {
      console.log(res)
      this.props.history.push('')
      this.props.dispatch(changeCateIndex(0))
    })
  }

  render() {
    const { post } = this.props

    return (
      <div style={{ width: '70%', margin: '0 auto' }}>
        <div style={{ marginBottom: 16, width: '50%' }}>
          <Input
            defaultValue={post.title}
            addonBefore="标题："
            placeholder="请输入标题，不能为空"
            ref={input => (this.titleInput = input)}
          />
        </div>
        <div style={{ marginBottom: 16, width: '25%' }}>
          <Input
            defaultValue={post.author}
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
          <Radio.Group
            disabled
            Value={post.category}
            buttonStyle="solid"
          >
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
            defaultValue={post.body}
            rows={4}
            style={{ marginTop: '10px' }}
            placeholder="请输入内容，不能为空"
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
  post: state.getIn(['postsData', 'modifyPost'])
})

const mapDispatch = dispatch => ({
  getModifyPost(post) {
    dispatch(getModifyPost(post))
  },
  changeCateIndex(num) {
    dispatch(changeCateIndex(num))
  }
})

export default connect(
  mapState,
  mapDispatch
)(CreatePost)
