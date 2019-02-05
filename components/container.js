import styled from 'styled-components'

import { space, maxWidth } from 'styled-system'
import { layout } from 'styles'

const Container = styled('div')(maxWidth, space)

Container.propTypes = {
  ...space.propTypes,
  ...maxWidth.propTypes
}

Container.defaultProps = {
  m: 'auto',
  maxWidth: layout
}

export default Container
