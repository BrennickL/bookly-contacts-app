import React from 'react'
import { Segment } from 'semantic-ui-react'
import { Label } from '../Label'
import Data from '../Data'
import styled from 'styled-components'

const Layout = styled(Segment)`
  padding: 0.25rem 1rem !important;
`

const PhoneInfo = ({ phone }) => (
  <Layout>
    <Label>{phone.type_of}</Label>
    <Data>
      {
        phone.country +
        ` (${phone.prefix}) ` +
        phone.areacode +
        ' - ' +
        phone.number
      }
    </Data>
  </Layout>
)

export default PhoneInfo
