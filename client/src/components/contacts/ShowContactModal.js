import React, { Component } from 'react'
import { Segment, Modal, Button } from 'semantic-ui-react'
import ShowFullContactInfo from './ShowFullContactInfo'

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
          <Segment basic>
            <ShowFullContactInfo {...this.props} />
          </Segment>
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
