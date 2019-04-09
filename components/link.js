import { createElement } from 'react'
import NextLink from 'next/link'
import { ExternalLink as ExternalLinkIcon } from './icons'
import styled from 'styled-components'
import { justifyContent, flexWrap, display, alignItems, flexDirection, space } from 'styled-system'

const { REGEX_LOCAL_URL } = require('../constants')

const CustomLink = styled('a')(
  display,
  alignItems,
  flexDirection,
  flexWrap,
  flexDirection,
  alignItems,
  justifyContent,
  space
)

export const InternalLink = ({ href, prefetch, ...props }) => <CustomLink href={href} {...props} />

InternalLink.defaultProps = {
  prefetch: false,
  target: '_self'
}

export const ExternalLink = ({ children, icon: hasIcon, href, prefetch, ...props }) => (
  <NextLink prefetch={prefetch} href={href}>
    <CustomLink href={href} {...props}>
      {children}
      {hasIcon && <ExternalLinkIcon />}
    </CustomLink>
  </NextLink>
)

ExternalLink.defaultProps = {
  icon: true,
  prefect: false,
  rel: 'noopener noreferrer',
  target: '_blank'
}

export const Link = props => {
  const isInternal = props.href.startsWith('#') || REGEX_LOCAL_URL.test(props.href)
  const LinkComponent = isInternal ? InternalLink : ExternalLink
  return createElement(LinkComponent, props)
}
