import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Segment } from 'semantic-ui-react'
import AddressForm from './AddressForm'

// Actions
import {
  indexAddresses,
  resetAddresses,
} from '../../actions/addresses.js'

class AddressForms extends Component {

  componentDidMount = () => this.loadAddresses(this.props)
  componentWillReceiveProps = ( props ) => this.loadAddresses(props)
  loadAddresses = ( props ) => {
    const { dispatch, contactId, addresses } = props
    if( contactId && addresses.length <= 0 ) {
      dispatch(indexAddresses(contactId))
    }
  }
  componentWillUnmount = () => this.props.dispatch(resetAddresses())

  displayAddressForms = () => {
    const { addresses } = this.props
    if( addresses.length > 0 ) {
      return addresses.map( address => (
        <AddressForm key={address.id} address={address} />
      ))
    }
  }

  render = () => {
    return (
      <Segment basic>
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
