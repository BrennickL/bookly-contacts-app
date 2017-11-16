import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Segment, Button, Dimmer, Loader } from 'semantic-ui-react'
import Ribbon from '../Ribbon'

// Forms
import ContactInfoForm from './ContactInfoForm'
import AddressForm from '../addresses/AddressForm'
import PhoneForm from '../phones/PhoneForm'
import EmailForm from '../emails/EmailForm'

// Actions
import {
  showContact,
  resetNewContact,
  indexContactAddresses,
  indexContactPhones,
  indexContactEmails,
} from '../../actions/contacts'


class NewContactForm extends Component {
  defaults = {
    addContact: true, contactsLoaded: false,
    addAddress: false, addressesLoaded: false,
    addPhone: false, phonesLoaded: false,
    addEmail: false, emailsLoaded: false,
    dispatchLoaders: true,
  }
  state = { ...this.defaults }

  componentDidMount = () => this.loadContactInfo(this.props)
  componentWillReceiveProps = ( props ) => this.loadContactInfo(props)
  componentWillUnmount = () => this.props.dispatch(resetNewContact())
  loadContactInfo = ( props ) => {
    const { dispatch, contactId, contact } = props
    const { dispatchLoaders } = this.state
    if( dispatchLoaders && contactId ) {
      dispatch(showContact(contactId,
        ()=>this.setState({contactsLoaded: true})))
      dispatch(indexContactAddresses(contactId,
        ()=>this.setState({addressesLoaded: true})))
      dispatch(indexContactPhones(contactId,
        ()=>this.setState({phonesLoaded: true})))
      dispatch(indexContactEmails(contactId,
        ()=>this.setState({emailsLoaded: true})))
      this.setState({ dispatchLoaders: false })
    }
  }

  toggleAddForm = ( form ) => this.setState({ [form]: !this.state[form] })

  displayAddresses = () => {
    const { contact: { addresses }} = this.props
    if( addresses.length > 0 ) {
      return addresses.map( address => (
        <AddressForm
          key={address.id}
          address={address}
          toggleAddForm={this.toggleAddForm} />
      ))
    }
  }

  displayPhones = () => {
    const { contact: { phones }} = this.props
    if( phones.length > 0 ) {
      return phones.map( phone => (
        <PhoneForm
          key={phone.id}
          phone={phone}
          toggleAddForm={this.toggleAddForm} />
      ))
    }
  }

  displayEmails = () => {
    const {contact: { emails }} = this.props
    if( emails.length > 0 ) {
      return emails.map( email => (
        <EmailForm
          key={email.id}
          email={email}
          toggleAddForm={this.toggleAddForm} />
      ))
    }
  }

  render = () => {
    const { contact } = this.props
    const contactId = contact.data.id
    const {
      addAddress, addressesLoaded,
      addPhone, phonesLoaded,
      addEmail, emailsLoaded,
      contactsLoaded,
    } = this.state

    return (
      <Segment>

        <Segment raised>
          { contactId &&
            <Dimmer active={ !contactsLoaded }>
              <Loader />
            </Dimmer>
          }
          <Ribbon content='General Information' />
          <ContactInfoForm
            contact={contact.data} />
        </Segment>

        <Segment raised>
          { contactId &&
            <Dimmer active={ !addressesLoaded }>
              <Loader />
            </Dimmer>
          }
          <Ribbon content='Addresses' />
          <Button
            type='button'
            floated='right'
            icon={ addAddress ? 'minus' : contactId ? 'add' : 'minus' }
            onClick={()=>this.toggleAddForm('addAddress')} />
          <Segment basic>
            { this.displayAddresses() }
            { addAddress && contactId &&
              <AddressForm
                contactId={contactId}
                toggleAddForm={this.toggleAddForm} />
            }
          </Segment>
        </Segment>

        <Segment raised>
          { contactId &&
            <Dimmer active={ !phonesLoaded }>
              <Loader />
            </Dimmer>
          }
          <Ribbon content='Phone Numbers' />
          <Button
            type='button'
            floated='right'
            icon={ addPhone ? 'minus' : contactId ? 'add' : 'minus' }
            onClick={()=>this.toggleAddForm('addPhone')} />
          <Segment basic>
            { this.displayPhones() }
            { addPhone && contactId &&
              <PhoneForm
                contactId={contactId}
                toggleAddForm={this.toggleAddForm} />
            }
          </Segment>
        </Segment>

        <Segment raised>
          { contactId &&
            <Dimmer active={ !emailsLoaded }>
              <Loader />
            </Dimmer>
          }
          <Ribbon content='E-mails' />
          <Button
            type='button'
            floated='right'
            icon={ addEmail ? 'minus' : contactId ? 'add' : 'minus' }
            onClick={()=>this.toggleAddForm('addEmail')} />
          <Segment basic>
            { this.displayEmails() }
            { addEmail && contactId &&
              <EmailForm
                contactId={contactId}
                toggleAddForm={this.toggleAddForm} />
            }
          </Segment>
        </Segment>
      </Segment>
    )
  }
}

const mapStateToProps = ( state, props ) => {
  return {
    contact: state.contacts.contact,
  }
}

export default connect(mapStateToProps)(NewContactForm)
