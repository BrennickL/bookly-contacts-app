import React from 'react'
import { Segment } from 'semantic-ui-react'
import Label from '../Label'
import Data from '../Data'

const Address = ({ address }) => (
  <Segment.Group>
    <Segment>
      <Label>Type</Label>
      <Data>{address.type_of}</Data>
    </Segment>
    <Segment>
      <Label>Street</Label>
      <Data>{address.street1}</Data>
    </Segment>
    <Segment>
      <Label>Street</Label>
      <Data>{address.street2}</Data>
    </Segment>
    <Segment.Group horizontal>
      <Segment>
        <Label>City</Label>
        <Data>{address.city}</Data>
      </Segment>
      <Segment>
        <Label>State</Label>
        <Data>{address.state}</Data>
      </Segment>
      <Segment>
        <Label>ZipCode</Label>
        <Data>{address.zipcode}</Data>
      </Segment>
      <Segment>
        <Label>Country</Label>
        <Data>{address.country}</Data>
      </Segment>
    </Segment.Group>
  </Segment.Group>
)

export default Address
