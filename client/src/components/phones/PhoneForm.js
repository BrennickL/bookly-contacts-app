import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Segment, Form, Button, Input, Select } from 'semantic-ui-react'
import DeleteButton from '../DeleteButton'
import TypesOf from '../TypesOf'

// Actions
import {
  updatePhone,
  deletePhone,
} from '../../actions/phones'
import {
  createContactPhone,
  deleteContactPhone,
} from '../../actions/contacts'


class PhoneForm extends Component {
  defaults = {
    id: '', country: '', prefix: '', areacode: '', number: '', type_of: 'Other',
    modified: '',
  }
  state = { ...this.defaults }

  componentDidMount = () => this.loadPhoneInfo(this.props)
  componentWillReceiveProps = ( props ) => this.loadPhoneInfo(props)
  // componentWillUnmount = () => this.props.dispatch(resetPhones())
  loadPhoneInfo = ( props ) => {
    const { phone } = props
    const { id } = this.state
    if( phone && id !== phone.id ) {
      this.setState({ ...phone })
    }
  }

  handleOnChange = ({target: {id,value}}) => this.setState({ [id]: value, modified: true })
  handleSelectChange = (event,{id,value}) => this.setState({ [id]: value, modified: true })
  handleDeletePhone = () => {
    const { dispatch, toggleAddForm, reloadPhones } = this.props
    const { id } = this.state
    dispatch(deletePhone(id))
    if( reloadPhones )
      reloadPhones()
    dispatch(deleteContactPhone(id))
    if( toggleAddForm )
      toggleAddForm('addContact')
    this.setState({ modified: false })
  }
  handleOnSubmit = ( event ) => {
    event.preventDefault()
    const { dispatch, contactId, toggleAddForm } = this.props
    const phone = this.state
    delete phone.modified
    if( phone.id ) {
      dispatch(updatePhone(phone))
      this.setState({ modified: false })
    } else {
      phone.contact_id = contactId
      dispatch(createContactPhone(phone))
      toggleAddForm('addPhone')
    }
  }


  render = () => {
    const {
      id, country, prefix, areacode, number, type_of,
      modified,
    } = this.state

    return (
      <Form onSubmit={this.handleOnSubmit}>
        <Form.Group widths={16}>
          <Form.Field
            required={false}
            control={Input}
            width={2}
            id='country'
            value={country}
            onChange={this.handleOnChange} />
          <Form.Field
            required
            control={Input}
            width={2}
            id='prefix'
            value={prefix}
            onChange={this.handleOnChange} />
          <Form.Field
            required
            control={Input}
            width={2}
            id='areacode'
            value={areacode}
            onChange={this.handleOnChange} />
          <Form.Field
            required
            control={Input}
            width={2}
            id='number'
            value={number}
            onChange={this.handleOnChange} />
          <Form.Field
            required
            control={Select}
            width={4}
            options={TypesOf.addresses}
            id='type_of'
            value={type_of ? type_of : 'Other'}
            onChange={this.handleSelectChange} />
          <Form.Field
            width={4}>
            <Segment basic textAlign='center' style={{ padding: '0'}}>
              { id &&
                <Button.Group size='tiny'>
                  <Button
                    type='submit'
                    icon='write'
                    color={ modified ? 'green' : 'grey' }
                    content={ modified ? 'Update!!' : '' }
                    disabled={ modified ? false : true } />
                  <Button.Or />
                  <DeleteButton onClick={this.handleDeletePhone} />
                </Button.Group>
              }
              { !id && modified &&
                <Button
                  size='mini'
                  type='submit'
                  icon='save'
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

export default connect()(PhoneForm)
