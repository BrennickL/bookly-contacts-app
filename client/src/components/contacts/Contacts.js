import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Table, Button } from 'semantic-ui-react'

// Actions
import {
  indexContacts,
  resetContacts,
} from '../../actions/contacts'

class Contacts extends Component {
  state = { hasMore: false }

  componentDidMount = () => {
    const { dispatch, contacts } = this.state
    if( !contacts || contacts.length <= 0 ) {
      dispatch(indexContacts())
      this.setState({ hasMore: true })
    }
  }
  componentWillUnmount = () => this.props.dispatch(resetContacts())

  loadMore = ( page ) => {
    const { dispatch, pagination } = this.props
    const { hasMore } = this.state
    if( hasMore && pagination.total_pages ) {
      if( page <= pagination.total_pages ) {
        dispatch(indexContacts(page))
      } else {
        this.setState({ hasMore: false })
      }
    }
  }

  displayTableRows = () => {
    const { contacts } = this.props
    if( contacts.length > 0 ) {
      return contacts.map( contact => {
        return (
          <Table.Row>
            <Table.Cell>Test Column</Table.Cell>
          </Table.Row>
        )
      })
    }
  }

  render = () => {
    return (
      <Container>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Last</Table.HeaderCell>
              <Table.HeaderCell>First</Table.HeaderCell>
              <Table.HeaderCell>Gender</Table.HeaderCell>
              <Table.HeaderCell>Age</Table.HeaderCell>
              <Table.HeaderCell>Birthdate</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            { this.displayTableRows() }
          </Table.Body>
          <Table.Footer></Table.Footer>
        </Table>
      </Container>
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
