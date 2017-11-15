import React from 'react'
import { Segment } from 'semantic-ui-react'
import ContactInfo from '../contacts/ContactInfo'
import Addresses from '../addresses/Addresses'
import Phones from '../phones/Phones'
import Emails from '../emails/Emails'

const ShowFullContactInfo = ({ contactId }) => (
  <Segment basic>
    <ContactInfo contactId={contactId} />
    <Addresses contactId={contactId} />
    <Phones contactId={contactId} />
    <Emails contactId={contactId} />
  </Segment>
)

export default ShowFullContactInfo
