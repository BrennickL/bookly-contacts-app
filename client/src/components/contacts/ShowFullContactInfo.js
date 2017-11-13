import React from 'react'
import { Segment } from 'semantic-ui-react'
import Addresses from '../addresses/Addresses'
import Phones from '../phones/Phones'
import ContactInfo from '../contacts/ContactInfo'

const ShowFullContactInfo = ({ contactId }) => (
  <Segment basic>
    <ContactInfo contactId={contactId} />
    <Addresses contactId={contactId} />
    <Phones contactId={contactId} />
  </Segment>
)

export default ShowFullContactInfo
