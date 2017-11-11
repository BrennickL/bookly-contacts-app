import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Segment, Form, Select, Input, Button } from 'semantic-ui-react'
import DatePicker from 'react-datepicker'
import moment from 'moment'

// DatePicker CSS
import 'react-datepicker/dist/react-datepicker.css'

class EditContactInfo extends Component {
  defaults = {
    id: '', last: '', first: '', gender: '', birthdate: ''
  }
  state = { ...this.defaults }
  genderOptions = [
    { key: 'male', text: 'Male', value: 'Male' },
    { key: 'female', text: 'Female', value: 'Female' },
  ]

  componentDidMount = () => {
    const { contacts, contactId } = this.props
    if( contacts.length > 0 && contactId ) {
      const contact = contacts.find( c => c.id === contactId )
      if( contact ){
        this.setState({ ...contact })
      }
    }
  }

  handleOnChange = ({target: {id,value}}) => this.setState({ [id]: value })
  handleSelectChange = (event, {id, value}) => this.setState({ [id]: value })
  handleDateChange = ( date ) => this.setState({ birthdate: date.format() })

  render = () => {
    const {
      id, last, first, gender, birthdate
    } = this.state
    return (
      <Form onSubmit={this.handleOnSubmit}>
        <Form.Group width='equal'>
          <Form.Field
            control={Input}
            label='First Name'
            id='first'
            value={first}
            onChange={this.handleOnChange} />
          <Form.Field
            control={Input}
            label='Last Name'
            id='last'
            value={last}
            onChange={this.handleOnChange} />
        </Form.Group>
        <Form.Group width='equal'>
          <Form.Field
            control={Select}
            options={this.genderOptions}
            label='Gender'
            id='gender'
            value={gender}
            onChange={this.handleSelectChange} />
          <Form.Field>
            <label>Birthdate</label>
            <DatePicker
              selected={moment(birthdate)}
              onChange={this.handleDateChange} />
          </Form.Field>
        </Form.Group>
        <Segment basic textAlign='right'>
          <Button.Group size='mini'>
            <Button
              type='submit'>
              { id ? 'Update' : 'Create' }
            </Button>
            <Button.Or />
            <Button
              type='button'
              onClick={this.handleDelete}>
              Delete
            </Button>
          </Button.Group>
        </Segment>
      </Form>
    )
  }
}

const mapStateToProps = ( state, props ) => {
  return {
    contacts: state.contacts.data,
  }
}

export default connect(mapStateToProps)(EditContactInfo)
