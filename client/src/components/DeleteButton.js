import React, { Component } from 'react'
import { Button, Confirm } from 'semantic-ui-react'

class DeleteButton extends Component {
  state = { open: false }

  show = () => this.setState({ open: true })
  handleConfirm = () =>
    this.setState({ open: false },()=>this.props.onClick())
  handleCancel = () => this.setState({ open: false })

  render() {
    return (
      <div>
        <Button
          type='button'
          icon='delete'
          color='red'
          onClick={this.show} />
        <Confirm
          open={this.state.open}
          cancelButton='Never mind'
          confirmButton="Yes, Let's delete it"
          onCancel={this.handleCancel}
          onConfirm={this.handleConfirm}
        />
      </div>
    )
  }
}

export default DeleteButton
