import React from 'react'
import { Input, Radio, Button } from 'antd'
import PropTypes from 'prop-types';

const { TextArea } = Input

export default function PostForm({
  onSubmit,
  title,
  author,
  category,
  body,
  onChangeInput,
  isEdit
}) {
  return (
    <div style={{ width: '70%', margin: '0 auto' }}>
      <div style={{ marginBottom: 16, width: '50%' }}>
        <Input
          name='title'
          value={title}
          addonBefore="标题："
          placeholder="请输入标题，不能为空"
          onChange={onChangeInput}
        />
      </div>
      <div style={{ marginBottom: 16, width: '25%' }}>
        <Input
          name='author'
          value={author}
          disabled={isEdit}
          addonBefore="作者："
          placeholder="请输入作者名称，不能为空"
          onChange={onChangeInput}
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
          name='category'
          value={category}
          buttonStyle="solid"
          disabled={isEdit}
          onChange={onChangeInput}
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
          name='body'
          value={body}
          rows={4}
          style={{ marginTop: '10px' }}
          placeholder="请输入内容，不能为空"
          onChange={onChangeInput}
        />
      </div>
      <div style={{ textAlign: 'center' }}>
        <Button onClick={onSubmit} type="primary" size="large">
          {isEdit ? '确定修改' : '确定创建'}
        </Button>
      </div>
    </div>
  )
}

PostForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  onChangeInput: PropTypes.func.isRequired,
  isEdit: PropTypes.bool
}
