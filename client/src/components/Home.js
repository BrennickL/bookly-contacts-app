import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Container, Header, Icon } from 'semantic-ui-react';
import styled from 'styled-components'

const P = styled.p`
  padding: 1rem 5rem;
  background-color: lightgrey;
  width: 50%;
  margin: 25% 25%;
  border-radius: 5px;
`

class Home extends Component {
  render() {
    return(
      <Container>
        <Header as='h1' icon textAlign='center' style={{marginTop: '10%'}}>
          <Icon name='address outline' size='huge' />
          <Header.Content>
            Welcome to the Contacts App!
          </Header.Content>
          </Header>
        <P>
          Please click the&nbsp;
          <Link to='/contacts'>Contacts</Link>
          &nbsp;link that appears in the
          upper right side of the navegation bar after you
          &nbsp;<Link to='/login'>Login</Link> or
          &nbsp;<Link to='/register'>Register</Link>.
        </P>
      </Container>
    );
  }
}

export default Home;
