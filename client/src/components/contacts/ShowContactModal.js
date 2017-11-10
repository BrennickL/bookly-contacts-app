import React, { Component } from 'react'
import { Modal, Button } from 'semantic-ui-react'
import ShowContactInfo from './ShowContactInfo'

class ShowContactModal extends Component {
  state = { openModal: true }

  handleOnClose = () => {
    this.setState({ openModal: false },()=>this.props.toggleModal('showModal'))
  }

  render = () => {
    const { openModal } = this.state
    return (
      <Modal
        open={openModal}
        onClose={this.handleOnClose}>
        <Modal.Content>
          <ShowContactInfo {...this.props} />
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
