import NextLink from 'next/link'
import { ExternalLink } from './icons'
import styled from 'styled-components'
import {
  justifyContent,
  flexWrap,
  display,
  alignItems,
  flexDirection,
  space
} from 'styled-system'

const linkStyle = {
  margin: '0 10px 0 0'
}

const isInternalLink = to => /^\/(?!\/)/.test(to)

const Link = styled('a')(
  display,
  alignItems,
  flexDirection,
  flexWrap,
  flexDirection,
  alignItems,
  justifyContent,
  space
)

export default ({
  style,
  href,
  prefetch = false,
  children,
  icon = true,
  ...props
}) => {
  const isInternal = isInternalLink(href)
  const rel = isInternal ? null : 'noopener noreferrer'
  const target = isInternal ? '_self' : '_blank'

  return (
    <NextLink prefetch={prefetch} href={href}>
      <Link
        href={href}
        rel={rel}
        target={target}
        style={icon ? { ...linkStyle, ...style } : style}
        {...props}
      >
        {children}
        {icon && <ExternalLink />}
      </Link>
    </NextLink>
  )
}
