import styled from 'styled-components'
import Box from './box'

import {
  fontFamily,
  fontWeight,
  textAlign,
  lineHeight,
  letterSpacing,
  maxWidth
} from 'styled-system'

const Text = styled(Box)(fontFamily, fontWeight, textAlign, lineHeight, letterSpacing, maxWidth)

Text.propTypes = {
  ...fontFamily.propTypes,
  ...fontWeight.propTypes,
  ...textAlign.propTypes,
  ...lineHeight.propTypes,
  ...maxWidth.propTypes,
  ...letterSpacing.propTypes
}

Text.defaultProps = {
  mb: '1.563rem'
}

export default Text
