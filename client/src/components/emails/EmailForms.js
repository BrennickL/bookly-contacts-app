import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Segment, Dimmer, Loader } from 'semantic-ui-react'
import EmailForm from './EmailForm'

// Actions
import {
  indexEmails,
  resetEmails,
} from '../../actions/emails'

class EmailForms extends Component {

  componentDidMount = () => this.loadEmails(this.props)
  componentWillReceiveProps = ( props ) => this.loadEmails(props)
  componentWillUnmount = () => this.props.dispatch(resetEmails())
  loadEmails = ( props ) => {
    const { dispatch, emails, contactId } = props
    if( emails.length <= 0 && contactId ) {
      dispatch(indexEmails(contactId))
    }
  }

  displayEmailForms = () => {
    const { emails } = this.props
    if( emails.length > 0 ) {
      return emails.map( email => {
        return (
          <EmailForm
            key={email.id}
            email={email}
            {...this.props} />
        )
      })
    }
  }

  render = () => {
    return (
      <Segment basic>
        <Dimmer active={this.props.emails.length > 0 ? false : true }>
          <Loader>Loading E-mails</Loader>
        </Dimmer>
        { this.displayEmailForms() }
      </Segment>
    )
  }
}

const mapStateToProps = ( state, props ) => {
  return {
    emails: state.emails.data,
  }
}

export default connect(mapStateToProps)(EmailForms)
