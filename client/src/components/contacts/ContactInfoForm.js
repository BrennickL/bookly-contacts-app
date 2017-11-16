import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Segment, Form, Select,
  Input, Button
} from 'semantic-ui-react'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import TypesOf from '../TypesOf'

// DatePicker CSS
import 'react-datepicker/dist/react-datepicker.css'

// Actions
import {
  updateContact,
  createContact,
} from '../../actions/contacts'

class ContactInfoForm extends Component {
  defaults = {
    id: '', last: '', first: '', gender: 'Other', birthdate: '',
    modified: false,
  }
  state = { ...this.defaults }

  componentDidMount = () => this.loadContactInfo(this.props)
  componentWillReceiveProps = (props) => this.loadContactInfo(props)
  loadContactInfo = ( props ) => {
    const { contacts, contactId, contact } = props
    if( contacts.length > 0 && contactId ) {
      const foundContact = contacts.find( c => c.id === contactId )
      if( foundContact ){
        this.setState({ ...foundContact })
      }
    } else if( contact ) {
      this.setState({ ...contact })
    }
  }


  handleOnChange = ({target: {id,value}}) => this.setState({ [id]: value, modified: true })
  handleSelectChange = (event, {id, value}) => this.setState({ [id]: value, modified: true })
  handleDateChange = ( date ) => this.setState({ birthdate: date.format(), modified: true })
  resetModified = () => this.setState({ modified: false })

  handleOnSubmit = ( event ) => {
    event.preventDefault()
    const { dispatch, userId } = this.props
    const contactInfo = this.state
    delete contactInfo.modified
    if( contactInfo.id ) {
      dispatch(updateContact(contactInfo))
    } else {
      contactInfo.user_id = userId
      dispatch(createContact(contactInfo))
    }
    this.resetModified()
  }

  isLoading = () => {
    const { contactId } = this.props
    const { last } = this.state
    return contactId && !last
  }

  render = () => {
    const {
      id, last, first, gender, birthdate,
      modified,
    } = this.state

    return (
      <Form onSubmit={this.handleOnSubmit} loading={ this.isLoading() ? true : false }>
        <Form.Group width='equal'>
          <Form.Field
            required
            control={Input}
            label='First Name'
            id='first'
            value={first}
            onChange={this.handleOnChange} />
          <Form.Field
            required
            control={Input}
            label='Last Name'
            id='last'
            value={last}
            onChange={this.handleOnChange} />
          <Form.Field
            required
            control={Select}
            options={TypesOf.genders}
            label='Gender'
            id='gender'
            value={gender ? gender : 'Other'}
            onChange={this.handleSelectChange} />
          <Form.Field required>
            <label>Birthday</label>
            <DatePicker
              selected={birthdate ? moment(birthdate) : null }
              onChange={this.handleDateChange} />
          </Form.Field>
        </Form.Group>
        <Segment basic textAlign='right'>
          { id &&
            <Button
              type='submit'
              size='mini'
              icon='write'
              content='Write Changes'
              color={ modified ? 'green' : 'grey' }
              disabled={ modified ? false : true } />
          }
          { !id && modified &&
            <Button
              type='submit'
              size='mini'
              icon='save'
              content='Create'
              color='green' />
          }
        </Segment>
      </Form>
    )
  }
}

const mapStateToProps = ( state, props ) => {
  return {
    contacts: state.contacts.data,
    userId: state.user.id,
  }
}

export default connect(mapStateToProps)(ContactInfoForm)
