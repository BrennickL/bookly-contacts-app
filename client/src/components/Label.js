import styled from 'styled-components'

// Custom Styled Components
const Label = styled.div`
  display: inline-block;
  font-weight: bold;
  font-size: 1.2rem;
  padding-right: 1rem;
  :after {
    content: ':'
  }
`
export default Label
