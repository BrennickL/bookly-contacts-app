import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Segment } from 'semantic-ui-react'
import moment from 'moment'
import { Label } from '../Label'
import Data from '../Data'
import Ribbon from '../Ribbon'


class ContactInfo extends Component {
  state = { id: '', last: '', first: '', gender: '', birthdate: '' }

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
    const diff = moment().diff(birth,'years').toString()
    return (
      <Segment>
        <Ribbon content='Personal Information' />

        <Segment.Group>
          <Segment.Group horizontal>
            <Segment>
              <Label>Last Name</Label>
              <Data>{last}</Data>
            </Segment>
            <Segment>
              <Label>First Name</Label>
              <Data>{first}</Data>
            </Segment>
          </Segment.Group>
          <Segment.Group horizontal>
            <Segment>
              <Label>Gender</Label>
              <Data>{gender}</Data>
            </Segment>
            <Segment>
              <Label>Age</Label>
              <Data>{diff}</Data>
            </Segment>
            <Segment>
              <Label>Birthdate</Label>
              <Data>{birth.format('DD MMM YYYY')}</Data>
            </Segment>
          </Segment.Group>
        </Segment.Group>
      </Segment>
    )
  }
}

const mapStateToProps = ( state, props ) => {
  return {
    contacts: state.contacts.data,
  }
}

export default connect(mapStateToProps)(ContactInfo)
