import React, { Component } from 'react'
import { getCategories } from '../utils/api'
import { Layout } from 'antd';

const { Content, Footer } = Layout;

export default class Home extends Component {
  state = {
    categories: []
  }

  componentDidMount() {
    getCategories().then(res => this.setState({
      categories: res
    }))
  }

  render() {
    const browserHeight = window.innerHeight;

    return (
      <div>
        <Layout className="layout" style={{ height: browserHeight }}>
          <Content style={{ padding: '0 50px', marginTop: '30px' }}>
            <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>Content</div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2018 Created by Ant UEDz
          </Footer>
        </Layout>
      </div>
    )
  }
}
