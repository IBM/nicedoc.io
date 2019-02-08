import styled from 'styled-components'
import Text from './text'

const Li = styled(Text)([])

Li.defaultProps = {
  ...Text.defaultProps,
  mb: '.64rem',
  as: 'li'
}

export default Li
