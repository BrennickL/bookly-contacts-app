import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Button, Input, Select } from 'semantic-ui-react'

// Actions
import {
  updatePhone,
  deletePhone,
} from '../../actions/phones'


class PhoneForm extends Component {
  defaults = {
    id: '', country: '', prefix: '', areacode: '', number: '', type_of: '',
    modified: '',
  }
  state = { ...this.defaults }

  componentDidMount = () => this.loadPhoneInfo(this.props)
  componentWillReceiveProps = ( props ) => this.loadPhoneInfo(props)
  // componentWillUnmount = () => this.props.dispatch(resetPhones())
  loadPhoneInfo = ( props ) => {
    const { phone } = props
    const { id } = this.state
    if( id !== phone.id ) {
      this.setState({ ...phone })
    }
  }

  typeOfOptions = [
    { key: 'Home', text: 'Home', value: 'Home' },
    { key: 'Work', text: 'Work', value: 'Work' },
    { key: 'Other', text: 'Other', value: 'Other' },
  ]

  handleOnChange = ({target: {id,value}}) => this.setState({ [id]: value, modified: true })
  handleSelectChange = (event,{id,value}) => this.setState({ [id]: value, modified: true })
  handleDeletePhone = () => {
    this.props.dispatch(deletePhone(this.state.id))
    this.setState({ modified: false })
  }
  handleOnSubmit = ( event ) => {
    event.preventDefault()
    const { dispatch } = this.props
    const phone = this.state
    delete phone.modified
    dispatch(updatePhone(phone))
    this.setState({ modified: false })
  }


  render = () => {
    const {
      country, prefix, areacode, number, type_of,
      modified,
    } = this.state

    return (
      <Form onSubmit={this.handleOnSubmit}>
        <Form.Group widths={16}>
          <Form.Field
            control={Input}
            type='number'
            width={2}
            id='country'
            value={country}
            onChange={this.handleOnChange} />
          <Form.Field
            control={Input}
            type='number'
            width={2}
            id='prefix'
            value={prefix}
            onChange={this.handleOnChange} />
          <Form.Field
            control={Input}
            type='number'
            width={2}
            id='areacode'
            value={areacode}
            onChange={this.handleOnChange} />
          <Form.Field
            control={Input}
            type='number'
            width={2}
            id='number'
            value={number}
            onChange={this.handleOnChange} />
          <Form.Field
            control={Select}
            width={4}
            options={this.typeOfOptions}
            id='type_of'
            value={type_of}
            onChange={this.handleSelectChange} />
          <Button.Group compact>
            <Button
              type='submit'
              icon='write'
              color={ modified ? 'green' : 'grey' }
              content={ modified ? 'Update!!' : '' }
              disabled={ modified ? false : true } />
            <Button.Or />
            <Button
              type='button'
              icon='delete'
              color='red'
              onClick={this.handleDeletePhone} />
          </Button.Group>
        </Form.Group>
      </Form>
    )
  }
}

export default connect()(PhoneForm)
