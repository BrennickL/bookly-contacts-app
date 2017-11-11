import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Confirm } from 'semantic-ui-react'

// Actions
import {
  deleteContact,
} from '../../actions/contacts'

class DeleteContactModal extends Component {
  state = { openConfirm: true }

  handleCancel = () => {
    this.setState({ openConfirm: false },
      ()=>this.props.toggleModal('deleteModal'))
    }
  handleConfirm = () => {
    const { dispatch, contactId, toggleModal } = this.props
    if( contactId ) {
      dispatch(deleteContact(contactId))
      this.setState({ openConfirm: false },()=>toggleModal('deleteModal'))
    }
  }

  render = () => {
    const { openConfirm } = this.state
    return (
      <Confirm
        open={openConfirm}
        onClose={this.handleCancel}
        onConfirm={this.handleConfirm}
        onCancel={this.handleCancel} />
    )
  }
}

export default connect()(DeleteContactModal)
