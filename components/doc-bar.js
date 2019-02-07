import { Home, Nicedoc, Star, License, GitHub } from 'components/icons'
import styled from 'styled-components'
import Text from './text'
import Flex from './flex'
import Hide from './hide'
import Link from './link'

import { navbar } from 'styles'
import urlib from 'url'

let URL
if (global.document) URL = window.URL
else URL = urlib.URL

const REGEX_STRIP_WWW = /^www\./

const getHostname = href => {
  const { hostname } = new URL(href)
  return hostname.replace(REGEX_STRIP_WWW, '')
}

const DocBar = styled(Flex)`
  line-height: 100%;
  background-color: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  content: '';
  height: ${navbar}px;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 2;

  > a:last-child {
    padding: 0;
  }
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
    <DocBar as='nav' justifyContent={['space-evenly', 'center']} px={3} py={0}>
      <NavLink href={'/'}>
        <Nicedoc size={16} mr={1} />
      </NavLink>

      <NavLink href={meta.githubUrl}>
        <GitHub size={16} mr={1} />
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

      {meta.homepage && (
        <NavLink href={meta.homepage}>
          <Home size={16} mr={1} />
          <Small>{getHostname(meta.homepage)}</Small>
        </NavLink>
      )}

      {meta.license && (
        <NavLink href={meta.licenseUrl}>
          <License size={16} mr={1} />
          <Small>{meta.license}</Small>
        </NavLink>
      )}

      <NavLink href={meta.starsUrl}>
        <Star size={16} mr={1} />
        <Small>{meta.stars}</Small>
      </NavLink>

      <NavLink href={meta.starsUrl}>
        <Small>{meta.score}</Small>
      </NavLink>
    </DocBar>
  )
}
