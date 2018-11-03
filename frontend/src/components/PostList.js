import { Table, Divider, Button, Radio } from 'antd'
import React from 'react'
import { connect } from 'react-redux'
import sortBy from 'sort-by'
import { Link } from 'react-router-dom'
 
import { getPosts, changePostSort } from '../actions'
import { deletePostAPI, changePostVoteAPI } from '../utils/api'

const RadioButton = Radio.Button
const RadioGroup = Radio.Group

class PostList extends React.Component {
  state = {
    postSort: 'voteScore'
  }

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
  handleChangeVote = (option, id) => {
    changePostVoteAPI(option, id).then(res => {
      console.log(res)
      this.funGetPosts()
    })
  }

  // 改变帖子排列顺序
  handleChangeSort = para => {
    let sort = ''
    switch (para) {
      case '标题':
        sort = 'title'
        break
      case '用户':
        sort = 'author'
        break
      case '评论数':
        sort = 'comments'
        break
      case '当前得分':
        sort = 'voteScore'
        break
      case '时间':
        sort = 'time'
        break
      default:
        sort = 'voteScore'
    }
    this.props.changePostSort(sort)
  }

  render() {
    const columns = [
      {
        title: '标题',
        dataIndex: 'title',
        key: 'title',
        render: text => <a href=" ">{text}</a>
      },
      {
        title: '用户',
        dataIndex: 'author',
        key: 'author'
      },
      {
        title: '评论数量',
        dataIndex: 'comments',
        key: 'comments',
        render: text => <span style={{ fontSize: '20px' }}>{text}</span>
      },
      {
        title: '当前得分',
        key: 'voteScore',
        dataIndex: 'voteScore',
        render: (text, record) => (
          <span style={{ fontSize: '20px' }}>
            {text}
            <span style={{ float: 'right' }}>
              <Button
                onClick={() => this.handleChangeVote('upVote', record.key)}
                style={{ marginRight: '10px' }}
                type="primary"
                shape="circle"
                icon="like"
                size="default"
              />
              <Button
                onClick={() => this.handleChangeVote('downVote', record.key)}
                type="primary"
                shape="circle"
                icon="dislike"
                size="default"
              />
            </span>
          </span>
        )
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <span>
            <Link to={`/modify-post/${record.key}`}>Edit</Link>
            <Divider type="vertical" />
            <a onClick={e => this.handleDeletePost(e, record.key)} href=" ">
              Delete
            </a>
          </span>
        )
      }
    ]

    const radioButtonList = ['标题', '用户', '评论数', '当前得分','时间']

    // 默认是以当前得分为排序，并以分数大的排列在前的方式
    const posts = this.props.posts.sort(sortBy(this.props.postSort)).reverse()

    return (
      <div>
        <span style={{ fontWeight: 'bolder', fontSize: '16px' }}>
          帖子排序：
        </span>
        <RadioGroup
          style={{ marginBottom: '20px' }}
          defaultValue="当前得分"
          size="default"
        >
          {radioButtonList.map((item, i) => (
            <RadioButton
              onClick={() => this.handleChangeSort(item)}
              key={i}
              value={item}
            >
              {item}
            </RadioButton>
          ))}
        </RadioGroup>
        <Table columns={columns} dataSource={posts} />
      </div>
    )
  }
}

const mapState = state => ({
  posts: state.toJS().postsData.posts.map(post => ({
    key: post.id,
    title: post.title,
    author: post.author,
    comments: post.commentCount,
    voteScore: post.voteScore,
    time: post.timestamp
  })),
  postSort: state.getIn(['postsData', 'postSort'])
})

const mapDispatch = dispatch => ({
  getPosts(cate) {
    dispatch(getPosts(cate))
  },
  changePostSort(sort) {
    dispatch(changePostSort(sort))
  }
})

export default connect(
  mapState,
  mapDispatch
)(PostList)
