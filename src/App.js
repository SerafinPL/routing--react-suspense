import React, { Component, Suspense } from 'react';
import { BrowserRouter, Route, NavLink } from 'react-router-dom';


import User from './containers/User';
import Welcome from './containers/Welcome';
const Posts = React.lazy(() => import('./containers/Posts'));
const Contact = React.lazy(() => import('./containers/Contact'));

class App extends Component {

  state = {
    showContact: false
  }

  toggleContact = () => {
    this.setState(prevState => {
      return {showContact: !prevState.showContact};
    });
  }

  render() {
    return (
      <React.Fragment>
        <BrowserRouter>
          <React.Fragment>
            <nav>
              <NavLink to="/user">User Page</NavLink> |&nbsp;
              <NavLink to="/posts">Posts Page</NavLink>
            </nav>
            <Route path="/" component={Welcome} exact />
            <Route path="/user" component={User} />
            <Route 
              path="/posts" 
              render={() => (
                <Suspense fallback={<div>...Loading</div>}>
                  <Posts />
                </Suspense>
                )} 
            />
          </React.Fragment>
        </BrowserRouter>
        <button onClick={this.toggleContact}>Toggle Contact</button>
        {this.state.showContact ? (
          <Suspense fallback={<div>...Loading</div>}>
            <Contact />
          </Suspense>
          ) : null}

      </React.Fragment>   
    );
  }
}

export default App;
