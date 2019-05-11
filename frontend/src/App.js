import React, { Component, Fragment } from 'react'
import { Layout } from 'antd'
import AppHeader from './commons/AppHeader'
import PostList from './pages/PostList'
import CreatePost from './pages/CreatePost'
import EditPost from './pages/EditPost'
import PostDetail from './pages/PostDetail'
import NoMathch from './pages/NoMatch'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

const { Content, Footer } = Layout

export default class Home extends Component {
  state = {
    categories: []
  }

  render() {
    const browserHeight = window.innerHeight

    return (
      <Fragment>
        <BrowserRouter>
          <Layout className="layout" style={{ minHeight: browserHeight }}>
            <AppHeader />
            <Content style={{ padding: '0 50px', marginTop: '30px' }}>
              <Switch>
                <Route exact path="/" component={PostList} />
                <Route exact path="/react" component={PostList} />
                <Route exact path="/redux" component={PostList} />
                <Route exact path="/udacity" component={PostList} />
                <Route exact path="/create-post" component={CreatePost} />
                <Route exact path="/edit/:id" component={EditPost} />
                <Route exact path="/:category/:id" component={PostDetail} />
                <Route exact path="/404" component={NoMathch} />
                <Redirect from="*" to="/404" />
              </Switch>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
              Readable ©2018 Created by Zhao
            </Footer>
          </Layout>
        </BrowserRouter>
      </Fragment>
    )
  }
}
