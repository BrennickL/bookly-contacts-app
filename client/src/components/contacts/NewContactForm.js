import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Segment, Button } from 'semantic-ui-react'
import Ribbon from '../Ribbon'

// Forms
import ContactInfoForm from './ContactInfoForm'
import AddressForm from '../addresses/AddressForm'
import PhoneForm from '../phones/PhoneForm'
import EmailForm from '../emails/EmailForm'

// Actions
import {
  resetNewContact,
} from '../../actions/contacts'

class NewContactForm extends Component {
  defaults = {
    addContact: true,
    addAddress: false,
    addPhone: false,
    addEmail: false,
  }
  state = { ...this.defaults }

  componentWillUnmount = () => this.props.dispatch(resetNewContact())

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
      addAddress,
      addPhone,
      addEmail,
    } = this.state

    return (
      <Segment>
        <Segment raised>
          <Ribbon content='General Information' />
          <ContactInfoForm
            contact={contact.data} />
        </Segment>

        <Segment raised>
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
