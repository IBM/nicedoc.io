import NextLink from 'next/link'
import ExternalIcon from './external-icon'

const linkStyle = {
  margin: '0 10px 0 0'
}

const isInternalLink = to => /^\/(?!\/)/.test(to)

export default ({ style, href, prefetch = false, children, ...props }) => {
  return (
    <NextLink prefetch={prefetch} href={href}>
      <a style={{ ...linkStyle, ...style }} {...props}>
        {children}
        {!isInternalLink(href) && <ExternalIcon />}
      </a>
    </NextLink>
  )
}
