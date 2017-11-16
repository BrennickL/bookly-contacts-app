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
  state = { reload: false }

  componentDidMount = () => this.loadEmails(this.props)
  componentWillReceiveProps = ( props ) => this.loadEmails(props)
  componentWillUnmount = () => this.props.dispatch(resetEmails())
  loadEmails = ( props ) => {
    const { dispatch, emails, contactId } = props
    if( emails.length <= 0 && contactId ) {
      dispatch(indexEmails(contactId))
    }
  }

  reloadEmails = () => this.setState({ reload: !this.state.reload })

  displayEmailForms = () => {
    const { emails } = this.props
    if( emails.length > 0 ) {
      return emails.map( email => {
        return (
          <EmailForm
            key={email.id}
            email={email}
            reloadEmails={this.reloadEmails}
            {...this.props} />
        )
      })
    }
  }

  isLoading = () => {
    const { contactId, emails } = this.props
    return contactId && emails.length <= 0
  }

  render = () => {
    return (
      <Segment basic>
        <Dimmer active={this.isLoading() ? true : false }>
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
