import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid } from 'semantic-ui-react'
import styled from 'styled-components'
import moment from 'moment'

// Custom Styled Components
const Label = styled.div`
  display: inline-block;
  font-weight: bold;
  font-size: 1.2rem;
  padding-right: 1rem;
  :after {
    content: ':'
  }
`

class ShowContactInfo extends Component {
  state = { last: '', first: '', gender: '', birthdate: '' }

  componentDidMount = () => this.loadContactInfo(this.props)
  componentWillReceiveProps = ( props ) => this.loadContactInfo(props)
  loadContactInfo = ( props ) => {
    const { contacts, contactId } = props
    if( contacts.length > 0 ) {
      this.setState({ ...contacts.find( c => c.id === contactId ) })
    }
  }

  render = () => {
    const { last,first,gender,birthdate } = this.state
    const birth = moment(birthdate)
    const diff = moment().diff(birth,'years')
    return (
      <Grid celled>
        <Grid.Row columns='equal'>
          <Grid.Column>
            <Label>Last Name</Label>
            {last}
          </Grid.Column>
          <Grid.Column>
            <Label>First Name</Label>
            {first}
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns='equal'>
          <Grid.Column>
            <Label>Gender</Label>
            {gender}
          </Grid.Column>
          <Grid.Column>
            <Label>Age</Label>
            {diff}
          </Grid.Column>
          <Grid.Column>
            <Label>Birthdate</Label>
            {birth.format('DD MMM YYYY')}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

const mapStateToProps = ( state, props ) => {
  return {
    contacts: state.contacts.data,
  }
}

export default connect(mapStateToProps)(ShowContactInfo)
