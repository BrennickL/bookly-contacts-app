import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Segment, Dimmer, Loader } from 'semantic-ui-react'
import Ribbon from '../Ribbon'
import PhoneInfo from './PhoneInfo'

// Actions
import {
  indexPhones,
  resetPhones,
} from '../../actions/phones'


class Phones extends Component {
  state = { loaded: false }

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

  displayPhones = () => {
    const { phones } = this.props
    if( phones.length > 0 ) {
      return phones.map( phone => (
        <PhoneInfo key={phone.id} phone={phone} />
      ))
    }
  }

  render = () => {
    const { loaded } = this.state
    const { phones } = this.props
    return (
      <Segment raised>
        <Dimmer active={ !loaded }>
          <Loader />
        </Dimmer>
        <Ribbon content='Phone Numbers' />

        { phones.length > 0 &&
          <Segment.Group>
            { this.displayPhones() }
          </Segment.Group>
        }
      </Segment>
    )
  }
}

const mapStateToProps = ( state, props ) => {
  return {
    phones: state.phones.data,
  }
}

export default connect(mapStateToProps)(Phones)
