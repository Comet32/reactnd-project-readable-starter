import { Table, Divider, Button } from 'antd';
import React from 'react'
import { connect } from 'react-redux'
import { getPosts } from '../actions'
import { deletePostAPI, changePostVoteAPI } from '../utils/api'

class PostList extends React.Component {
  componentDidMount() {
    this.funGetPosts()
  }

  // 根据路由获取帖子
  funGetPosts = () => {
    // 获取路由中的分类字符串
    let cate = this.props.match.path.slice(1)
    this.props.getPosts(cate)
  }

  // 删除帖子
  handleDeletePost = (e, id) => {
    e.preventDefault()
    console.log(id)
    deletePostAPI(id).then(res => {
      console.log(res)
      this.funGetPosts()
    })
  }

  // 改变当前得分
  handleChangeVote = (option,id) => {
    changePostVoteAPI(option,id).then(res => {
      console.log(res)
      this.funGetPosts()
    })
  }

  render() {
    const columns = [{
      title: '标题',
      dataIndex: 'title',
      key: 'title',
      render: text => <a href=" ">{text}</a>,
    }, {
      title: '用户',
      dataIndex: 'author',
      key: 'author',
    }, {
      title: '评论数量',
      dataIndex: 'comments',
      key: 'comments',
      render: text => (
        <span style={{ fontSize: '20px' }}>
          {text}
        </span >
      )
    }, {
      title: '当前得分',
      key: 'voteScore',
      dataIndex: 'voteScore',
      render: (text, record) => (
        <span style={{ fontSize: '20px' }}>
          {text}
          <span style={{ float: 'right' }}>
            <Button onClick={() => this.handleChangeVote('upVote',record.key)} style={{ marginRight: '10px' }} type="primary" shape="circle" icon="like" size='default' />
            <Button onClick={() => this.handleChangeVote('downVote',record.key)} type="primary" shape="circle" icon="dislike" size='default' />
          </span>
        </span >
      ),
    }, {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <a href=" ">Edit</a>
          <Divider type="vertical" />
          <a onClick={(e) => this.handleDeletePost(e, record.key)} href=" ">Delete</a>
        </span>
      ),
    }];
    return <Table columns={columns} dataSource={this.props.posts}></Table>
  }
}

const mapState = (state) => ({
  posts: state.toJS().postsData.posts.map(post => ({
    key: post.id,
    title: post.title,
    author: post.author,
    comments: post.commentCount,
    voteScore: post.voteScore
  }))
})

const mapDispatch = (dispatch) => ({
  getPosts(cate) {
    dispatch(getPosts(cate))
  }
})

export default connect(mapState, mapDispatch)(PostList)
