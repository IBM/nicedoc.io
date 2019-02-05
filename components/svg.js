import { color, space, size, style } from 'styled-system'
import styled from 'styled-components'

const transform = style({
  prop: 'transform',
  cssProperty: 'transform'
})

const Svg = styled('svg')(color, space, size, transform)

Svg.defaultProps = {
  ariaHidden: 'true',
  fill: 'currentColor'
}

Svg.propTypes = {
  ...space.propTypes,
  ...size.propTypes,
  ...color.propTypes
}

export default Svg
