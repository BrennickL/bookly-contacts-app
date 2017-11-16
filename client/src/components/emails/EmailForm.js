import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Segment, Form, Button, Input, Select } from 'semantic-ui-react'

// Actions
import {
  updateEmail,
  deleteEmail,
} from '../../actions/emails'
import {
  createContactEmail,
  deleteContactEmail,
} from '../../actions/contacts'


class EmailForm extends Component {
  defaults = {
    id: '', type_of: '', address: '', modified: false,
  }
  state = { ...this.defaults }

  typeOfOptions = [
    { key: 'Home', text: 'Home', value: 'Home' },
    { key: 'Work', text: 'Work', value: 'Work' },
    { key: 'Other', text: 'Other', value: 'Other' },
  ]

  componentDidMount = () => this.loadEmail(this.props)
  componentWillReceiveProps = ( props ) => this.loadEmail(props)
  loadEmail = ( props ) => {
    const { email } = props
    if( email && email.address ) {
      this.setState({ ...email })
    }
  }

  handleOnChange = ({target: {id,value}}) => this.setState({ [id]: value, modified: true })
  handleSelectChange = (e, {id, value}) => this.setState({ [id]: value, modified: true })
  handleDeleteEmail = () => {
    const { dispatch, toggleAddForm, reloadEmails } = this.props
    const { id } = this.state
    dispatch(deleteEmail(id))
    if( reloadEmails )
      reloadEmails()
    dispatch(deleteContactEmail(id))
    if( toggleAddForm )
      toggleAddForm('addContact')
    this.setState({ modified: false })
  }
  handleOnSubmit = ( event ) => {
    event.preventDefault()
    const { dispatch, contactId, toggleAddForm } = this.props
    const email = this.state
    delete email.modified
    if( email.id ) {
      dispatch(updateEmail(email))
      this.setState({ modified: false })
    } else {
      email.contact_id = contactId
      dispatch(createContactEmail(email))
      toggleAddForm('addEmail')
    }
  }

  render = () => {
    const { id, type_of, address, modified } = this.state

    return (
        <Form onSubmit={this.handleOnSubmit}>
          <Form.Group widths={16}>
            <Form.Field
              required
              width={7}
              control={Input}
              type='email'
              label='Address'
              id='address'
              value={address}
              onChange={this.handleOnChange} />
            <Form.Field
              required
              width={6}
              control={Select}
              options={this.typeOfOptions}
              label='Type'
              id='type_of'
              value={type_of}
              onChange={this.handleSelectChange} />
            <Form.Field width={3}>
              <Segment basic textAlign='center'>
                { id &&
                  <Button.Group size='mini'>
                    <Button
                      type='submit'
                      disabled={ modified ? false : true }
                      color={ modified ? 'green' : 'grey' }
                      content={ modified ? 'Update' : '' } />
                    <Button.Or />
                    <Button
                      type='button'
                      color='red'
                      icon='delete'
                      onClick={this.handleDeleteEmail} />
                  </Button.Group>
                }
                { !id && modified &&
                  <Button
                    type='submit'
                    color='green'
                    content='Create' />
                }
              </Segment>
            </Form.Field>
          </Form.Group>
        </Form>
    )
  }
}

export default connect()(EmailForm)
