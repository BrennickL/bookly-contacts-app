import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Segment, Dimmer, Loader } from 'semantic-ui-react'
import PhoneForm from './PhoneForm'

// Actions
import {
  indexPhones,
  resetPhones,
} from '../../actions/phones'

class PhoneForms extends Component {
  state = { loaded: false, reload: false }

  componentDidMount = () => this.loadPhones(this.props)
  componentWillReceiveProps = ( props ) => this.loadPhones(props)
  componentWillUnmount = () => this.props.dispatch(resetPhones())
  loadPhones = ( props ) => {
    const { dispatch, phones, contactId } = props
    const { loaded } = this.state
    if( !loaded ) {
      if( phones.length <= 0 && contactId ) {
        dispatch(indexPhones(contactId,()=>this.setState({ loaded: true })))
      }
    }
  }

  reloadPhones = () => this.setState({ reload: !this.state.reload })

  displayPhoneForms = () => {
    const { phones } = this.props
    if( phones.length > 0 ) {
      return phones.map( phone => {
        return (
          <PhoneForm
            key={phone.id}
            phone={phone}
            reloadPhones={this.reloadPhoes} />
        )
      })
    }
  }

  render = () => {
    const { loaded } = this.state
    return (
      <Segment basic>
        <Dimmer active={ !loaded }>
          <Loader>Loading Phone Numbers</Loader>
        </Dimmer>
        { this.displayPhoneForms() }
      </Segment>
    )
  }
}

const mapStateToProps = ( state, props ) => {
  return {
    phones: state.phones.data,
  }
}

export default connect(mapStateToProps)(PhoneForms)
