import React, { Component } from 'react'
import { Layout } from 'antd';
import AppHeader from './AppHeader'
import PostList from './PostList'
import CreatePost from './CreatePost'
import { BrowserRouter, Route } from 'react-router-dom'


const { Content, Footer } = Layout;

export default class Home extends Component {
  state = {
    categories: []
  }

  render() {
    const browserHeight = window.innerHeight;

    return (
      <div>
        <BrowserRouter>
          <Layout className="layout" style={{ minHeight: browserHeight }}>
            <AppHeader />
            <Content style={{ padding: '0 50px', marginTop: '30px' }}>
              <Route path='/' exact component={PostList} />
              <Route path='/react' exact component={PostList} />
              <Route path='/redux' exact component={PostList} />
              <Route path='/udacity' exact component={PostList} />
              <Route path='/createpost' exact component={CreatePost} />
            </Content>
            <Footer style={{ textAlign: 'center' }}>
              Readable ©2018 Created by Zhao
            </Footer>
          </Layout>
        </BrowserRouter>
      </div>
    )
  }
}
