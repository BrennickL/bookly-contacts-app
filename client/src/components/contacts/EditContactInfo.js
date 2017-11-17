import React, { Component } from 'react'
import { connect } from 'react-redux'
import NewContactForm from './NewContactForm'

class EditContactInfo extends Component {

  render = () => {
    return (
      <NewContactForm {...this.props} />
    )
  }
}

const mapStateToProps = ( state, props ) => {
  return {
    contacts: state.contacts.data,
  }
}

export default connect(mapStateToProps)(EditContactInfo)
