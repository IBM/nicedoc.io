import styled from 'styled-components'
import Box from './box'

import {
  fontFamily,
  fontWeight,
  textAlign,
  lineHeight,
  letterSpacing
} from 'styled-system'

const Text = styled(Box)(
  fontFamily,
  fontWeight,
  textAlign,
  lineHeight,
  letterSpacing
)

Text.propTypes = {
  ...fontFamily.propTypes,
  ...fontWeight.propTypes,
  ...textAlign.propTypes,
  ...lineHeight.propTypes,
  ...letterSpacing.propTypes
}

export default Text
