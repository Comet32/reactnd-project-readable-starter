import React, { Component } from 'react'
import { capitalize, strToIndex } from '../utils/helpers'
import { Layout, Menu, Button } from 'antd';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { getCategories } from '../actions'
import { changeCateIndex } from '../actions/header'

const { Header } = Layout;

class AppHeader extends Component {
  componentDidMount() {
    this.props.initialCate()
    this.initIndex()
  }

  // 根据路径改变默认选择项
  initIndex = () => {
    let cate = window.location.pathname.slice(1)
    let num = strToIndex(cate)
    this.props.changeCate(num)
  }

  render() {
    const { categories, cateIndex, changeCate } = this.props
    const buttonStyle = {
      position: 'absolute',
      right: '50px',
      top: '14px'
    }

    return (
      <div>
        <Header style={{ position: 'relative' }}>
          <Menu
            theme="dark"
            mode="horizontal"
            selectedKeys={[String(cateIndex)]}
            style={{ lineHeight: '64px' }}
          >
            {categories && categories.map((item, key) => (
              <Menu.Item onClick={ () => this.initIndex()} key={key}><Link to={`/${item.path}`}>{capitalize(item.name)}</Link></Menu.Item>
            ))}
          </Menu>
          <Link to='create-post'><Button onClick={() => changeCate(5)} style={buttonStyle} type="primary" icon="plus" size={'default'}>新建帖子</Button></Link>
        </Header>
      </div>
    )
  }
}

const mapState = (state) => ({
  categories: state.getIn(['postsData', 'categories']),
  cateIndex: state.getIn(['headerData', 'index'])
})

const mapDispatch = (dispatch) => ({
  initialCate() {
    dispatch(getCategories())
  },
  changeCate(num) {
    dispatch(changeCateIndex(num))
  }
})

export default connect(mapState, mapDispatch)(AppHeader)
