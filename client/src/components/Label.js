import styled from 'styled-components'

// Custom Styled Components
export const Label = styled.div`
  display: inline-block;
  font-weight: bold;
  font-size: 1rem;
  padding-right: 1rem;
  :after {
    content: ':'
  }
`
export const Title = Label
