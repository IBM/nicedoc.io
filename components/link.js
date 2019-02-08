import NextLink from 'next/link'
import { ExternalLink } from './icons'
import { isNil } from 'lodash'
import styled from 'styled-components'
import { justifyContent, flexWrap, display, alignItems, flexDirection, space } from 'styled-system'

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

export default ({ href, prefetch = false, children, icon, ...props }) => {
  const isInternal = isInternalLink(href)
  const rel = isInternal ? null : 'noopener noreferrer'
  const target = isInternal ? '_self' : '_blank'
  const hasIcon = isNil(icon) ? !isInternal : icon

  return (
    <NextLink prefetch={prefetch} href={href}>
      <Link href={href} rel={rel} target={target} {...props}>
        {children}
        {hasIcon && <ExternalLink />}
      </Link>
    </NextLink>
  )
}
