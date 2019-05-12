import { Table, Divider, Button, message } from 'antd'
import React from 'react'
import { connect } from 'react-redux'
import sortBy from 'sort-by'
import { Link } from 'react-router-dom'

import deleteConfirm from '../components/DeleteConfirm'
import SortRadio from '../components/SortRadio'

import { getPosts, changePostSort } from '../actions/postList'
import { deletePostAPI, changePostVoteAPI } from '../utils/api'
import { chineseToEnglish } from '../utils/helpers'
import { radioButtonListForPost } from '../utils/constants'

class PostList extends React.Component {
  state = {
    postSort: 'voteScore'
  }

  componentDidMount() {
    this.getCataPosts()
    this.props.changePostSort('voteScore')
  }

  // 根据路由获取帖子
  getCataPosts = () => {
    // 获取路由中的分类字符串
    let cate = this.props.match.path.slice(1)
    this.props.getPosts(cate)
  }

  // 删除帖子
  handleDeletePost = (e, id) => {
    e.preventDefault()
    deleteConfirm(id, this.handleOk)
  }

  handleOk = id => {
    deletePostAPI(id).then(res => {
      this.getCataPosts()
      message.success('删除成功', 2)
    })
  }

  // 改变投票得分
  handleChangeVote = (option, id) => {
    changePostVoteAPI(option, id).then(res => {
      this.getCataPosts()
    })
  }

  // 改变帖子排列顺序
  handleChangeSort = para => {
    const sort = chineseToEnglish(para)
    this.props.changePostSort(sort)
  }

  render() {
    const columns = [
      {
        title: '标题',
        dataIndex: 'title',
        key: 'title',
        render: (text, record) => (
          <Link to={`detail/${record.category}/${record.key}`}>{text}</Link>
        )
      },
      {
        title: '作者',
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
        title: '投票得分',
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
            <Link to={`edit/${record.key}`}>Edit</Link>
            <Divider type="vertical" />
            <a onClick={e => this.handleDeletePost(e, record.key)} href=" ">
              Delete
            </a>
          </span>
        )
      }
    ]

    // 默认是以投票得分为排序，并以分数大的排列在前
    const posts =
      this.props.posts &&
      this.props.posts.sort(sortBy(this.props.postSort)).reverse()

    return (
      <div>
        <SortRadio
          name="帖子排序"
          list={radioButtonListForPost}
          onChangeSort={this.handleChangeSort}
          defaultSort="投票得分"
        />
        {posts && <Table columns={columns} dataSource={posts} />}
      </div>
    )
  }
}

const mapState = state => {
  return {
    posts:
      state.toJS().postsData.posts.length &&
      state.toJS().postsData.posts.map(post => ({
        key: post.id,
        title: post.title,
        author: post.author,
        comments: post.commentCount,
        voteScore: post.voteScore,
        timestamp: post.timestamp,
        category: post.category
      })),
    postSort: state.getIn(['postsData', 'postSort'])
  }
}

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
