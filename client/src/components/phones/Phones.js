import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Segment } from 'semantic-ui-react'
import Ribbon from '../Ribbon'
import PhoneInfo from './PhoneInfo'

// Actions
import {
  indexPhones,
  resetPhones,
} from '../../actions/phones'


class Phones extends Component {

  componentDidMount = () => this.loadPhones(this.props)
  componentWillReceiveProps = ( props ) => this.loadPhones(props)
  componentWillUnmount = () => this.props.dispatch(resetPhones())
  loadPhones = ( props ) => {
    const { dispatch, phones, contactId } = props
    if( phones.length <= 0 && contactId ) {
      dispatch(indexPhones(contactId))
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
    return (
      <Segment raised>
        <Ribbon content='Phone Numbers' />

        <Segment.Group>
          { this.displayPhones() }
        </Segment.Group>
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
