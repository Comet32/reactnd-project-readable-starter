import React, { Component, Fragment } from 'react'
import { capitalize, CateStrToIndex } from '../utils/helpers'
import { Layout, Menu, Button } from 'antd'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { getCategories, getPosts } from '../actions/postList'
import { changeCateIndex } from '../actions/header'

const { Header } = Layout

const buttonStyle = {
  position: 'absolute',
  right: '50px',
  top: '14px'
}

class AppHeader extends Component {
  componentDidMount() {
    this.props.initialCate()
    this.initIndex()
  }

  // 根据路径改变默认选择项
  initIndex = () => {
    let cate = window.location.pathname.slice(1)
    let num = CateStrToIndex(cate)
    this.props.changeCate(num)

    // 获取新的服务器数据
    this.props.getPosts(cate)
  }

  render() {
    const { categories, cateIndex, changeCate } = this.props

    return (
      <Fragment>
        <Header style={{ position: 'relative' }}>
          <Menu
            theme="dark"
            mode="horizontal"
            selectedKeys={[String(cateIndex)]}
            style={{ lineHeight: '64px' }}
          >
            {categories &&
              categories.map((item, key) => (
                <Menu.Item onClick={() => this.initIndex()} key={key}>
                  <Link to={`/${item.path}`}>{capitalize(item.name)}</Link>
                </Menu.Item>
              ))}
          </Menu>
          <Link to="/create-post">
            <Button
              onClick={() => changeCate(5)}
              style={buttonStyle}
              type="primary"
              icon="plus"
              size={'default'}
            >
              新建帖子
            </Button>
          </Link>
        </Header>
      </Fragment>
    )
  }
}

const mapState = state => ({
  categories: state.getIn(['postsData', 'categories']),
  cateIndex: state.getIn(['headerData', 'index'])
})

const mapDispatch = dispatch => ({
  initialCate() {
    dispatch(getCategories())
  },
  changeCate(num) {
    dispatch(changeCateIndex(num))
  },
  getPosts(cate) {
    dispatch(getPosts(cate))
  }
})

export default connect(
  mapState,
  mapDispatch
)(AppHeader)
