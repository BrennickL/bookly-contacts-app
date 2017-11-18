import React, { Component } from 'react'
import { Modal, Button } from 'semantic-ui-react'
import NewContactForm from './NewContactForm'

class NewContactModal extends Component {
  state = { openModal: true }

  handleOnClose = () => {
    this.setState({openModal:false},
      ()=>this.props.toggleModal('newContactModal'))
  }

  render = () => {
    const { openModal } = this.state
    return (
      <Modal
        open={openModal}
        onClose={this.handleOnClose}>
        <Modal.Content>
          <NewContactForm
            handleOnClose={this.handleOnClose}
            reloadContacts={this.props.reloadContacts} />
        </Modal.Content>
        <Modal.Actions>
          <Button.Group>
            <Button
              type='button'
              content='Back to Contacts'
              onClick={this.handleOnClose} />
          </Button.Group>
        </Modal.Actions>
      </Modal>
    )
  }
}

export default NewContactModal
