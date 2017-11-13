import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Segment, Form, Button, Input, Select, Label } from 'semantic-ui-react'
import styled from 'styled-components'

// Actions
import {
  updateAddress,
  deleteAddress,
} from '../../actions/addresses'

// Custom Styled Components
const Ribbon = styled(Label)`
  margin: 1rem 0 !important;
`

class AddressForm extends Component {
  defaults = {
    id: '', street1: '', street2: '', city: '', state: '', country: '',
    zipcode: '', type_of: '', modified: false,
  }
  state = { ...this.defaults }

  typeOfOptions = [
    { key: 'Home', text: 'Home', value: 'Home' },
    { key: 'Work', text: 'Work', value: 'Work' },
    { key: 'Other', text: 'Other', value: 'Other' },
  ]

  componentDidMount = () => this.loadAddressInfo(this.props)
  componentWillReceiveProps = ( props ) => this.loadAddressInfo(props)
  loadAddressInfo = ( props ) => this.setState({ ...props.address })

  handleOnChange = ({target: {id,value}}) => this.setState({ [id]: value, modified: true })
  handleSelectChange = (event, {id, value}) => this.setState({ [id]: value, modified: true })
  handleNewForm = () => this.setState({ ...this.defaults })
  handleDelete = () => this.props.dispatch(deleteAddress(this.state.id))
  handleOnSubmit = ( event ) => {
    event.preventDefault()
    const { dispatch } = this.props
    const address = this.state
    delete address.modified
    dispatch(updateAddress(address))
    this.resetModified()
  }

  resetModified = () => this.setState({ modified: false })

  render = () => {
    const {
      street1, street2, city,
      state, country, zipcode, type_of,
      modified,
    } = this.state

    return (
      <Segment raised>
        <Ribbon color='blue' ribbon>{type_of}</Ribbon>

        <Form onSubmit={this.handleOnSubmit}>
          <Form.Field
            control={Input}
            label='Street'
            id='street1'
            value={street1}
            onChange={this.handleOnChange} />
          <Form.Field
            control={Input}
            label='Street'
            id='street2'
            value={street2}
            onChange={this.handleOnChange} />
          <Form.Group widths='equal'>
            <Form.Field
              control={Input}
              label='City'
              id='city'
              value={city}
              onChange={this.handleOnChange} />
            <Form.Field
              control={Input}
              label='State'
              id='state'
              value={state}
              onChange={this.handleOnChange} />
            <Form.Field
              control={Input}
              label='ZipCode'
              id='zipcode'
              value={zipcode}
              onChange={this.handleOnChange} />
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Field
              control={Input}
              label='Country'
              id='country'
              value={country}
              onChange={this.handleOnChange} />
            <Form.Field
              control={Select}
              options={this.typeOfOptions}
              label='Type'
              id='type_of'
              value={type_of}
              onChange={this.handleSelectChange} />
          </Form.Group>
            <Segment basic textAlign='right'>
              <Button.Group size='tiny'>
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
                  color='red' />
              </Button.Group>
            </Segment>
        </Form>
      </Segment>
    )
  }
}

export default connect()(AddressForm)
