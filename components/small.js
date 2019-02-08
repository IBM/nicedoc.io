import styled from 'styled-components'
import Text from './text'

const Small = styled(Text)(
  props => `
  white-space: nowrap;
  text-overflow: ellipsis;
  display: block;
`
)

Small.defaultProps = {
  ...Text.defaultProps,
  mb: 0,
  as: 'small'
}

export default Small
