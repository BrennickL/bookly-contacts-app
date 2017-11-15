import React from 'react'
import { Segment } from 'semantic-ui-react'
import { Label } from '../Label'
import Data from '../Data'
import styled from 'styled-components'

const Layout = styled(Segment)`
  padding: 0.25rem 1rem !important;
`

const EmailInfo = ({ email }) => (
    <Layout>
      <Label>{email.type_of}</Label>
      <Data>
        { email.address }
      </Data>
    </Layout>
)

export default EmailInfo
