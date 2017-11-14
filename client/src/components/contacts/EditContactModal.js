import React, { Component } from 'react'
import { Modal, Button } from 'semantic-ui-react'
import EditContactInfo from './EditContactInfo'

class ShowContactModal extends Component {
  state = { openModal: true }

  handleOnClose = () => {
    this.setState({ openModal: false },()=>this.props.toggleModal('editModal'))
  }

  render = () => {
    const { openModal } = this.state
    return (
      <Modal
        open={openModal}
        onClose={this.handleOnClose}>
        <Modal.Content>
          <EditContactInfo {...this.props} handleOnClose={this.handleOnClose} />
        </Modal.Content>
        <Modal.Actions>
          <Button.Group size='tiny'>
            <Button
              type='button'
              onClick={this.handleOnClose}>
              Back
            </Button>
          </Button.Group>
        </Modal.Actions>
      </Modal>
    )
  }
}

export default ShowContactModal
