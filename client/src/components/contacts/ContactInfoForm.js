import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Segment, Form, Select, Input, Button } from 'semantic-ui-react'
import DatePicker from 'react-datepicker'
import moment from 'moment'

// DatePicker CSS
import 'react-datepicker/dist/react-datepicker.css'

// Actions
import {
  updateContact,
} from '../../actions/contacts'

class ContactInfoForm extends Component {
  defaults = {
    id: '', last: '', first: '', gender: '', birthdate: '',
    modified: false,
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

  handleOnChange = ({target: {id,value}}) => this.setState({ [id]: value, modified: true })
  handleSelectChange = (event, {id, value}) => this.setState({ [id]: value, modified: true })
  handleDateChange = ( date ) => this.setState({ birthdate: date.format() })
  resetModified = () => this.setState({ modified: false })

  handleOnSubmit = ( event ) => {
    event.preventDefault()
    const { dispatch } = this.props
    const contactInfo = this.state
    delete contactInfo.modified
    dispatch(updateContact(contactInfo))
    this.resetModified()
  }

  render = () => {
    const {
      last, first, gender, birthdate,
      modified,
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
          <Form.Field
            control={Select}
            options={this.genderOptions}
            label='Gender'
            id='gender'
            value={gender}
            onChange={this.handleSelectChange} />
          <Form.Field>
            <label>Birthday</label>
            <DatePicker
              selected={moment(birthdate)}
              onChange={this.handleDateChange} />
          </Form.Field>
        </Form.Group>
        { modified &&
          <Segment basic textAlign='right'>
            <Button
              type='submit'
              size='mini'
              icon='write'
              content='Write Changes'
              color={ modified && 'green'}
              disabled={ modified ? false : true } />
          </Segment>
        }
      </Form>
    )
  }
}

const mapStateToProps = ( state, props ) => {
  return {
    contacts: state.contacts.data,
  }
}

export default connect(mapStateToProps)(ContactInfoForm)
