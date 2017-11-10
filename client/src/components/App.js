import React, { Component } from 'react';
import NoMatch from './NoMatch';
import NavBar from './NavBar';
import Login from './Login';
import Register from './Register';
import Flash from './Flash';
import Home from './Home';
import ProtectedRoute from './ProtectedRoute';
import { Switch, Route } from 'react-router-dom';
import FetchUser from './FetchUser';
import { Container } from 'semantic-ui-react'
// Custom Components
import Contacts from './contacts/Contacts'

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Flash />
        <FetchUser>
        <Container>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
            <ProtectedRoute exact path='/contacts' component={Contacts} />
            <Route component={NoMatch} />
          </Switch>
        </Container>
        </FetchUser>
      </div>
    );
  }
}

export default App;
