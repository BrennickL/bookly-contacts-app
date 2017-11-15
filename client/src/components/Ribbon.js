import React from 'react'
import styled from 'styled-components'
import { Label } from 'semantic-ui-react'

const RibbonArea = styled(Label)`
  margin: 0 0 !important;
`

const Ribbon = ({ color = 'blue', content }) => (
  <RibbonArea color={color} ribbon>{content}</RibbonArea>
)

export default Ribbon
