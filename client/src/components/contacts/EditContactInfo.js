import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Segment, Label } from 'semantic-ui-react'
import styled from 'styled-components'

// Forms
import ContactInfoForm from './ContactInfoForm'
import AddressForms from '../addresses/AddressForms'
import PhoneForms from '../phones/PhoneForms'
import EmailForms from '../emails/EmailForms'

// Custom Styled Components
const Ribbon = styled(Label)`
  margin: 1rem 0 !important;
`

class EditContactInfo extends Component {
  defaults = {}
  state = { ...this.defaults }

  render = () => {
    return (
      <Segment raised>

        <Ribbon color='blue' ribbon>Personal Info</Ribbon>
        <ContactInfoForm {...this.props} />

        <Ribbon color='blue' ribbon>Addresses</Ribbon>
        <AddressForms {...this.props} />

        <Ribbon color='blue' ribbon>Phone Numbers</Ribbon>
        <PhoneForms {...this.props} />

        <Ribbon color='blue' ribbon>Emails</Ribbon>
        <EmailForms {...this.props} />

      </Segment>
    )
  }
}

const mapStateToProps = ( state, props ) => {
  return {
    contacts: state.contacts.data,
  }
}

export default connect(mapStateToProps)(EditContactInfo)
