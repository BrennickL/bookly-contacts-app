import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Segment, Dimmer, Loader } from 'semantic-ui-react'
import Address from './Address'
import Ribbon from '../Ribbon'

// Actions
import {
  indexAddresses,
  resetAddresses,
} from '../../actions/addresses.js'

class Addresses extends Component {
  state = { loaded: false }

  componentDidMount = () => this.loadAddresses(this.props)
  componentWillReceiveProps = ( props ) => this.loadAddresses(props)
  loadAddresses = ( props ) => {
    const { dispatch, contactId, addresses } = props
    const { loaded } = this.state
    if( !loaded ) {
      if( contactId && addresses.length <= 0 ) {
        dispatch(indexAddresses(contactId,()=>this.setState({ loaded: true })))
      }
    }
  }
  componentWillUnmount = () => this.props.dispatch(resetAddresses())

  displayAddresses = () => {
    const { addresses } = this.props
    if( addresses.length > 0 ) {
      return addresses.map( address => (
        <Address key={address.id} address={address} />
      ))
    }
  }

  isLoading = () => {
    const { addresses, contactId } = this.props
    return contactId && addresses.length <= 0
  }

  render = () => {
    const { loaded } = this.state
    return (
      <Segment>
        <Dimmer active={ !loaded }>
          <Loader />
        </Dimmer>
        <Ribbon content='Addresses' />

        { this.displayAddresses() }
      </Segment>
    )
  }
}

const mapStateToProps = ( state, props ) => {
  return {
    addresses: state.addresses.data,
  }
}

export default connect(mapStateToProps)(Addresses)
