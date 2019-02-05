import { Pulse, License, GitHub } from 'components/icons'
import styled from 'styled-components'
import TimeAgo from 'react-timeago'
import Text from './text'
import Flex from './flex'
import Hide from './hide'
import Link from './link'

const DocBar = styled(Flex)`
  line-height: 100%;
  background-color: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  content: '';
  height: 65px;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 2;
`

const Small = styled(Text)`
  white-space: nowrap;
  text-overflow: ellipsis;
  display: block;
`

Small.defaultProps = {
  ...Text.defaultProps,
  as: 'small'
}

const NavLink = styled(Link)`
  color: black;
`

NavLink.defaultProps = {
  ...Link.defaultProps,
  display: 'flex',
  pr: [0, 4],
  alignItems: 'center',
  icon: false
}

export default ({ meta }) => {
  return (
    <DocBar as='nav' justifyContent={['space-around', 'center']} px={3} py={0}>
      <NavLink href={meta.githubUrl}>
        <GitHub size={16} mr={2} />
        <Hide breakpoints={[0]}>
          <Small>
            <span>{meta.owner}</span>
            <span>/</span>
            <strong>{meta.repo}</strong>
          </Small>
        </Hide>
        <Hide breakpoints={[1, 2, 3]}>
          <Small>
            <span>{meta.repo}</span>
          </Small>
        </Hide>
      </NavLink>

      {meta.license && (
        <NavLink href={meta.licenseUrl}>
          <License size={16} mr={2} />
          <Small>{meta.license}</Small>
        </NavLink>
      )}

      <NavLink href={meta.activityUrl}>
        <Pulse size={16} mr={2} />
        <Small>
          <TimeAgo date={meta.updatedAt} />
        </Small>
      </NavLink>
    </DocBar>
  )
}
