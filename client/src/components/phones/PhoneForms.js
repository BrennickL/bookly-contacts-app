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
  state = { reload: false }

  componentDidMount = () => this.loadPhones(this.props)
  componentWillReceiveProps = ( props ) => this.loadPhones(props)
  componentWillUnmount = () => this.props.dispatch(resetPhones())
  loadPhones = ( props ) => {
    const { dispatch, phones, contactId } = props
    if( phones.length <= 0 && contactId ) {
      dispatch(indexPhones(contactId))
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

  isLoading = () => {
    const { contactId, phones } = this.props
    return contactId && phones.length <= 0
  }

  render = () => {
    return (
      <Segment basic>
        <Dimmer active={this.isLoading() ? true : false }>
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
