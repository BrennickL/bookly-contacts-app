import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Segment, Label } from 'semantic-ui-react'
import styled from 'styled-components'
import NewContactForm from './NewContactForm'

// Custom Styled Components
const Ribbon = styled(Label)`
  margin: 1rem 0 !important;
`

class EditContactInfo extends Component {
  defaults = {}
  state = { ...this.defaults }

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
