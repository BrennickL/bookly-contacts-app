import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Segment, Dimmer, Loader } from 'semantic-ui-react'
import AddressForm from './AddressForm'
import Ribbon from '../Ribbon'

// Actions
import {
  indexAddresses,
  resetAddresses,
} from '../../actions/addresses.js'

class AddressForms extends Component {
  state = { loaded: false, reload: false }

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

  displayAddressForms = () => {
    const { addresses } = this.props
    if( addresses.length > 0 ) {
      return addresses.map( address => (
        <Segment raised key={address.id}>
          <Ribbon content={address.type_of} />
          <AddressForm
            address={address}
            reloadAddresses={this.reloadAddresses} />
        </Segment>
      ))
    }
  }

  reloadAddresses = () => this.setState({ reload: !this.state.reload})

  render = () => {
    const { loaded } = this.state
    return (
      <Segment basic>
        <Dimmer active={ !loaded }>
          <Loader>Loading Addresses</Loader>
        </Dimmer>
        { this.displayAddressForms() }
      </Segment>
    )
  }
}

const mapStateToProps = ( state, props ) => {
  return {
    addresses: state.addresses.data,
  }
}

export default connect(mapStateToProps)(AddressForms)
