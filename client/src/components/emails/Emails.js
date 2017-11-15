import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Segment } from 'semantic-ui-react'
import Ribbon from '../Ribbon'
import EmailInfo from './EmailInfo'

// Actions
import {
  indexEmails,
  resetEmails,
} from '../../actions/emails'


class Emails extends Component {

  componentDidMount = () => this.loadEmails(this.props)
  componentWillReceiveProps = ( props ) => this.loadEmails(props)
  componentWillUnmount = () => this.props.dispatch(resetEmails())
  loadEmails = ( props ) => {
    const { dispatch, emails, contactId } = props
    if( emails.length <= 0 && contactId ) {
      dispatch(indexEmails(contactId))
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
    return (
      <Segment raised>
        <Ribbon content='Emails' />
        
        <Segment.Group>
          { this.displayEmails() }
        </Segment.Group>
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
