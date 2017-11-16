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

const P = styled.p`
  text-align: justify;
  padding: 0 2rem;
`

class Contacts extends Component {
  defaults = {
    hasMore: false, showModal: false,
    editModal: false, deleteModal: false,
    newContactModal: false,
    letterSelected: '', contactId: ''
  }
  state = { ...this.defaults }

  componentDidMount = () => {
    const { dispatch, contacts} = this.props
    if( !contacts || contacts.length <= 0 ) {
      dispatch(indexContacts())
      this.setState({ hasMore: true })
    }
  }
  componentWillUnmount = () => this.props.dispatch(resetContacts())

  toggleModal = ( modal, contactId = '' ) => {
    this.setState({
      ...this.defaults,
      [modal]: !this.state[modal],
      contactId,
    })
  }

  setQueryLetter = ( letterSelected ) => {
    const { dispatch } = this.props
    dispatch(indexContacts(letterSelected))
    this.setState({ letterSelected })
  }

  loadMore = ( page ) => {
    const { dispatch, pagination } = this.props
    const { hasMore, letterSelected } = this.state
    if( hasMore && pagination.total_pages ) {
      if( page <= pagination.total_pages ) {
        dispatch(indexContacts(letterSelected,page))
      } else {
        this.setState({ hasMore: false })
      }
    }
  }

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
            toggleModal={this.toggleModal} />
        }
      </Segment>
    )
  }
}

const mapStateToProps = ( state, props ) => {
  return {
    contacts: state.contacts.data,
    pagination: state.contacts.pagination,
  }
}

export default connect(mapStateToProps)(Contacts)
