import React from 'react'
import { Segment, Label } from 'semantic-ui-react'
import { Title } from '../Label'
import Data from '../Data'

const Address = ({ address }) => (
  <Segment.Group padded>
    <Label attached='top left'>
      {address.type_of} Address
    </Label>
    <Segment>
      <Title>Street</Title>
      <Data>{address.street1}</Data>
    </Segment>
    <Segment>
      <Title>Street</Title>
      <Data>{address.street2}</Data>
    </Segment>
    <Segment.Group horizontal>
      <Segment>
        <Title>City</Title>
        <Data>{address.city}</Data>
      </Segment>
      <Segment>
        <Title>State</Title>
        <Data>{address.state}</Data>
      </Segment>
      <Segment>
        <Title>ZipCode</Title>
        <Data>{address.zipcode}</Data>
      </Segment>
      <Segment>
        <Title>Country</Title>
        <Data>{address.country}</Data>
      </Segment>
    </Segment.Group>
  </Segment.Group>
)

export default Address
