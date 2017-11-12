import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Segment, Form, Button } from 'semantic-ui-react'

class AddressForm extends Component {
  defaults = {
    id: '', street1: '', street2: '', city: '', state: '', country: '',
    zipcode: '', type_of: '',
  }
  state = { ...this.defaults }

  handleNewForm = () => this.setState({ ...this.defaults })
  handleDelete = () => this.props.dispatch(deleteAddress(this.state.id))
  handleOnSubmit = ( event ) => {
    event.preventDefault()
    const { dispatch } = this.props
    const { id } = this.state
    if( id ) {
      dispatch(updateAddress(this.state))
    } else {
      dispatch(createAddress(this.state))
    }
  }

  render = () => {
    return (
      <Form onSubmit={this.handleOnSubmit}>
        <Segment basic>
          <Button.Group size='mini'>
            <Button
              type='submit'>
              { id ? 'Update' : 'Create' }
            </Button>
            <Button.Or />
            <Button
              type='button'
              onClick={this.handleNewForm}>
              New Form
            </Button>
            <Button.Or />
            <Button
              type='button'
                onClick={this.handleDelete}>
                Delete
            </Button>
          </Button.Group>
        </Segment>
      <Form>
    )
  }
}
