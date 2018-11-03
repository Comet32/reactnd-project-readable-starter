import React, { Component } from 'react'
import { Input, Radio, Button } from 'antd'
import { random24 } from '../utils/helpers'
import { postPostsAPI } from '../utils/api'
import { connect } from 'react-redux'
import { changeCateIndex } from '../actions/header'

const { TextArea } = Input

class CreatePost extends Component {
  handleSubmit = (e) => {
    e.preventDefault()
    const body = {
      id: random24(),
      timestamp: Date.now(),
      title: this.titleInput.input.value,
      body: this.bodyInput.textAreaRef.value,
      author: this.authorInput.input.value,
      category: this.cateInput.state.value
    }
    console.log(body)
    postPostsAPI(body).then(res => {
      console.log(res)
      this.props.history.push('')
      this.props.dispatch(changeCateIndex(0))
    })
  }

  render() {
    return (
      <div style={{ width: '70%', margin: '0 auto' }}>
        <div style={{ marginBottom: 16, width: '50%' }}>
          <Input
          addonBefore="标题：" 
          placeholder='请输入标题，不能为空' 
          ref={(input) => this.titleInput = input}/>
        </div>
        <div style={{ marginBottom: 16, width: '25%' }}>
          <Input addonBefore="用户：" 
          placeholder='请输入用户名，不能为空'
          ref={(input) => this.authorInput = input} />
        </div>
        <div style={{marginBottom:'20px'}}>
          <span style={{ display: 'inline-block', marginLeft: '12px', marginRight:'12px' }}>类别：</span>
          <Radio.Group 
          defaultValue="react" 
          buttonStyle="solid"
          ref={(input) => this.cateInput = input}
          onChange={() => console.log(this.cateInput.state.value)}>
            <Radio.Button value="react">React</Radio.Button>
            <Radio.Button value="redux">Redux</Radio.Button>
            <Radio.Button value="udacity">Udacity</Radio.Button>
          </Radio.Group>
        </div>
        <div style={{marginBottom:'20px'}}>
          <span style={{ display: 'inline-block', marginLeft: '12px' }}>内容：</span>
          <TextArea 
          rows={4} 
          style={{ marginTop: '10px' }}
          placeholder='请输入内容，不能为空' 
          ref={(input) => this.bodyInput = input}
          onChange={()=> console.log()}/>
        </div>
        <div style={{textAlign:'center'}}>
          <Button onClick={this.handleSubmit} type="primary" size='large'>确定创建</Button>
        </div>
      </div>
    )
  }
}

export default connect()(CreatePost)
