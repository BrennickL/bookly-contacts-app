import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'

class ContactsMenu extends Component {
  state = { letterSelected: '' }

  handleLetterSelected = (e, { name }) => {
    this.setState({letterSelected: name},()=>this.props.setQueryLetter(name))
  }

  loadMenuItems = () => {
    const { letterSelected } = this.state
    const alpha = this.createAlphabet()
    if( alpha.length > 0 ) {
      return alpha.map( letter =>
        // TODO: Add Controlled Popup displaying the number of entries per letter
        <Menu.Item
          key={letter}
          name={letter}
          active={ letter === letterSelected }
          onClick={this.handleLetterSelected} />
      )
    }
  }

  createAlphabet = () => {
    let alpha = []
    for(
      let idx='A'.charCodeAt(0), end='Z'.charCodeAt(0);
      idx <= end;
      ++idx)
      {
        alpha.push(String.fromCharCode(idx).toUpperCase())
      }
    return alpha
  }

  render = () => {
    return (
      <Menu pagination compact>
        { this.loadMenuItems() }
      </Menu>
    )
  }
}

export default ContactsMenu
