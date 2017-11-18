import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Segment, Table, Button, Header, Icon } from 'semantic-ui-react'
import moment from 'moment'
import ContactsMenu from './ContactsMenu'
import Paginator from '../Paginator'
import ShowContactModal from './ShowContactModal'
import EditContactModal from './EditContactModal'
import DeleteContactModal from './DeleteContactModal'
import NewContactModal from './NewContactModal'
import styled from 'styled-components'


// Actions
import {
  indexContacts,
  resetContacts,
} from '../../actions/contacts'

// Custom Styled Components
const P = styled.p`
  text-align: justify;
  padding: 0 2rem;
`

/**
 * Component respresenting a Contact Model or a single user contact object
 */
class Contacts extends Component {
  /** @type {Hash} default parameters for the components 'state' */
  defaults = {
    hasMore: false, showModal: false,
    editModal: false, deleteModal: false,
    newContactModal: false,
    letterSelected: '', contactId: ''
  }
  /** @type {Hash} inherits directly from {@link defaults} */
  state = { ...this.defaults }

  /**
   * Initiates the component upon mounting. Requests the Contact models from
   * the remote server and stores them in redux. After obtaining the models
   * the paginator state is set to true.
   */
  componentDidMount = () => {
    const { dispatch, contacts, userId } = this.props
    if( !contacts || contacts.length <= 0 ) {
      // Request the Contact Models
      dispatch(indexContacts(userId))
      // Set the Paginator state once the models have been requested
      this.setState({ hasMore: true })
    }
  }

  /**
   * Clears all the Contact models from redux upon unmounting the component
   */
  componentWillUnmount = () => this.props.dispatch(resetContacts())

  /**
   * Toggles the Modal states for creating, editing, viewing and deleting
   * Contacts for the given user.
   * @param {String} modal - the modal whose state will be toggled
   * @param {Integer} contactId - ID for reseting the selected contact
   */
  toggleModal = ( modal, contactId = '' ) => {
    this.setState({
      ...this.defaults,
      [modal]: !this.state[modal],
      contactId,
    })
  }

  /**
   * Setter for the alphabetical letter that will be used to query the users
   * Contacts. Used only for filtering by last name!
   * @param {Char} letterSelected - Single, first, letter of the contacts last name
   */
  setQueryLetter = ( letterSelected ) => {
    const { dispatch, userId } = this.props
    dispatch(indexContacts(userId, letterSelected))
    this.setState({ letterSelected })
  }

  /**
   * Loader for Paginator component {@see Paginator}
   * @param {Integer} page - Next Page number to be retrieved
   */
  loadMore = ( page ) => {
    const { dispatch, pagination, userId } = this.props
    const { hasMore, letterSelected } = this.state
    if( hasMore && pagination.total_pages ) {
      if( page <= pagination.total_pages ) {
        dispatch(indexContacts(userId,letterSelected,page))
      } else {
        this.setState({ hasMore: false })
      }
    }
  }

  /**
   * Reloader for Contacts being viewed after changes were made in the database.
   * @param {Char} letterSelected - letter for querying, first of last name
   */
  reloadContacts = ( letterSelected = 'A' ) => {
    const { dispatch, userId } = this.props
    dispatch(indexContacts(userId,letterSelected,1))
    this.setState({ letterSelected })
  }

  /**
   * Displays the Different Rows of the table. Each Row is a Contact with
   * it's corresponding functions.
   */
  displayTableRows = () => {
    const { contacts } = this.props
    if( contacts.length > 0 ) {
      return contacts.map( contact => {
        const birth = moment(contact.birthdate)
        const id = contact.id
        return (
          <Table.Row key={contact.id}>
            <Table.Cell>{contact.last}</Table.Cell>
            <Table.Cell>{contact.first}</Table.Cell>
            <Table.Cell>{contact.gender}</Table.Cell>
            <Table.Cell>{moment().diff(birth,'years')}</Table.Cell>
            <Table.Cell>{birth.format('ddd, MMM Do YYYY')}</Table.Cell>
            <Table.Cell textAlign='center'>
              <Button.Group size='mini'>
                <Button
                  type='button'
                  onClick={()=>this.toggleModal('showModal',id)}>
                  View
                </Button>
                <Button.Or />
                <Button
                  type='button'
                  onClick={()=>this.toggleModal('editModal',id)}>
                  Edit
                </Button>
                <Button.Or />
                <Button
                  type='button'
                  onClick={()=>this.toggleModal('deleteModal',id)}>
                  Remove
                </Button>
              </Button.Group>
            </Table.Cell>
          </Table.Row>
        )
      })
    }
  }

  /**
   * Render the Contacts table
   */
  render = () => {
    const {
      showModal,
      editModal,
      deleteModal,
      newContactModal,
      contactId,
    } = this.state

    return (
      <Segment basic>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell colSpan={6}>
                <Header as='h2' icon textAlign='center'>
                  <Icon name='address book outline' size='huge'/>
                  <Header.Content>
                    Contacts App
                  </Header.Content>
                </Header>
                <P>
                  Welcome to the Contacts App! Here you will be able to
                  organize your contacts and their associated information.
                  To get started click the green button labled 'New Contact'
                  and you'll be directed to a form where your contacts
                  information can be uploded and stored. Once the initial
                  contact information is loaded, you'll have the option to
                  add their corresponding addresses, phone numbers, and
                  emails
                </P>
                <P>
                  To help organize your contacts use the alphabetical tabs
                  located at the top of the table to filter the your contacts
                  by last name, and, subsequently first name. Modifications
                  to individual contacts can be made through use of the edit
                  button and visualizing their entire record is done with the
                  view button. Use the remove button with cation as it will
                  delete the entire contact's record from the database.
                </P>
              </Table.HeaderCell>
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell colSpan={7}>
                <ContactsMenu setQueryLetter={this.setQueryLetter} />
              </Table.HeaderCell>
            </Table.Row>

            <Table.Row>
              <Table.HeaderCell>Last</Table.HeaderCell>
              <Table.HeaderCell>First</Table.HeaderCell>
              <Table.HeaderCell>Gender</Table.HeaderCell>
              <Table.HeaderCell>Age</Table.HeaderCell>
              <Table.HeaderCell>Birthdate</Table.HeaderCell>
              <Table.HeaderCell>&nbsp;</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            { this.displayTableRows() }
          </Table.Body>

          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan={6}>
                <Button.Group size='mini'>
                  <Button
                    type='button'
                    color='green'
                    content='New Contact'
                    onClick={()=>this.toggleModal('newContactModal')} />
                </Button.Group>
                <Paginator
                  loadMore={this.loadMore}
                  pagination={this.props.pagination} />
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
        { showModal &&
          <ShowContactModal
            toggleModal={this.toggleModal}
            contactId={contactId} />
        }

        { editModal &&
          <EditContactModal
            toggleModal={this.toggleModal}
            contactId={contactId} />
        }

        { deleteModal &&
          <DeleteContactModal
            toggleModal={this.toggleModal}
            contactId={contactId} />
        }

        { newContactModal &&
          <NewContactModal
            reloadContacts={this.reloadContacts}
            toggleModal={this.toggleModal} />
        }
      </Segment>
    )
  }
}

/**
 * Give access to the contacts information and pagination information
 * stored in redux
 */
const mapStateToProps = ( state, props ) => {
  return {
    userId: state.user.id,
    contacts: state.contacts.data,
    pagination: state.contacts.pagination,
  }
}

export default connect(mapStateToProps)(Contacts)
