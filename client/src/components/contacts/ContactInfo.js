import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Segment } from 'semantic-ui-react'
import moment from 'moment'
import { Label } from '../Label'
import Data from '../Data'
import Ribbon from '../Ribbon'

/**
 * Representation of a single contact's information layout
 */
class ContactInfo extends Component {
  /** @type {Hash} state - current state of the contacts information */
  state = { id: '', last: '', first: '', gender: '', birthdate: '' }

  /**
   * Loader for contacts information when the component is mounted
   */
  componentDidMount = () => this.loadContactInfo(this.props)

  /**
   * Loader for when the already mounted component receives new information
   * @param {Props} props - react properties object
   */
  componentWillReceiveProps = ( props ) => this.loadContactInfo(props)

  /**
   * Loader for any information passed into the component representing
   * a contact.
   * @param {Props} props - passed in react properties object
   */
  loadContactInfo = ( props ) => {
    const { contacts, contactId } = props
    if( contacts.length > 0 ) {
      this.setState({ ...contacts.find( c => c.id === contactId ) })
    }
  }

  /**
   * Renders the Contacts information
   */
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

/**
 * Gives Access to the contacts list and information from redux
 */
const mapStateToProps = ( state, props ) => {
  return {
    contacts: state.contacts.data,
  }
}

export default connect(mapStateToProps)(ContactInfo)
