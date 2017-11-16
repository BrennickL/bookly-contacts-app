import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Segment, Dimmer, Loader } from 'semantic-ui-react'
import Ribbon from '../Ribbon'
import EmailInfo from './EmailInfo'

// Actions
import {
  indexEmails,
  resetEmails,
} from '../../actions/emails'


class Emails extends Component {
  state = { loaded: false }

  componentDidMount = () => this.loadEmails(this.props)
  componentWillReceiveProps = ( props ) => this.loadEmails(props)
  componentWillUnmount = () => this.props.dispatch(resetEmails())
  loadEmails = ( props ) => {
    const { dispatch, emails, contactId } = props
    const { loaded } = this.state
    if( !loaded ) {
      if( emails.length <= 0 && contactId ) {
        dispatch(indexEmails(contactId,()=>this.setState({ loaded: true })))
      }
    }
  }


  displayEmails = () => {
    const { emails } = this.props
    if( emails.length > 0 ) {
      return emails.map( email => {
        return (
          <EmailInfo
            key={email.id}
            email={email} />
        )
      })
    }
  }

  render = () => {
    const { loaded } = this.state
    const { emails } = this.props
    return (
      <Segment raised>
        <Dimmer active={ !loaded }>
          <Loader />
        </Dimmer>
        <Ribbon content='Emails' />

        { emails.length > 0 &&
          <Segment.Group>
            { this.displayEmails() }
          </Segment.Group>
        }
      </Segment>
    )
  }
}

const mapStateToProps = ( state, props ) => {
  return {
    emails: state.emails.data,
  }
}

export default connect(mapStateToProps)(Emails)
