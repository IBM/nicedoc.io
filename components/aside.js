import Box from './box'
import styled from 'styled-components'
import { top } from 'styled-system'

import { transition, fontSizes } from 'styles'

const Aside = styled(Box)`
  position: fixed;
  overflow-y: scroll;
  bottom: 0;
  transition: transform: ${transition.medium}};
  font-size: ${fontSizes[2]}px;

  ul {
    margin-bottom: 0;
    list-style: none;
    padding-left: 4px;
  }

  li {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  ${props =>
    props.hash &&
    `
  a[href="${props.hash}"] {
    font-weight: bold;
  }
  `}

  ${top};
`

Aside.defaultProps = {
  ...Box.defaultProps,
  as: 'aside'
}

export default Aside
