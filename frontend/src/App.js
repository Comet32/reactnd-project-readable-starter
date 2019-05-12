import React, { Component, Fragment } from 'react'
import { Layout } from 'antd'
import AppHeader from './commons/AppHeader'
import PostList from './pages/PostList'
import CreatePost from './pages/CreatePost'
import EditPost from './pages/EditPost'
import PostDetail from './pages/PostDetail'
import NoMathch from './pages/NoMatch'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'

const { Content, Footer } = Layout

const routes = [
  { path: '/', name: 'Home', Component: PostList },
  { path: '/react', name: 'PostReact', Component: PostList },
  { path: '/redux', name: 'PostRedux', Component: PostList },
  { path: '/udacity', name: 'PostUdacity', Component: PostList },
  { path: '/create-post', name: 'CreatePost', Component: CreatePost },
  { path: '/edit/:id', name: 'EditPost', Component: EditPost },
  { path: '/detail/:category/:id', name: 'PostDetail', Component: PostDetail },
  { path: '/404', name: 'NoMathch', Component: NoMathch }
]

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
              {/* <Route exact path="/" component={PostList} />
                <Route exact path="/react" component={PostList} />
                <Route exact path="/redux" component={PostList} />
                <Route exact path="/udacity" component={PostList} />
                <Route exact path="/create-post" component={CreatePost} />
                <Route exact path="/edit/:id" component={EditPost} />
                <Route exact path="/:category/:id" component={PostDetail} />
                <Route exact path="/404" component={NoMathch} /> */}
              {routes.map(({ path, Component }) => (
                <Route key={path} exact path={path}>
                  {({ ...props }) => (
                    <CSSTransition
                      in={props.match !== null}
                      timeout={300}
                      classNames="page-transition"
                      unmountOnExit
                    >
                      <div className="page-transition">
                        <Component {...props} />
                      </div>
                    </CSSTransition>
                  )}
                </Route>
              ))}
              <Switch>
                {routes.map(({ path, Component }) => (
                  <Route key={path} exact path={path} component={null} />
                ))}
                <Redirect to="/404" />
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
