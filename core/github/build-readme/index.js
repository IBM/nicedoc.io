import { Permalink, ExternalLink } from 'components/icons'
import imageExtensions from 'image-extensions'
import ReactDOMServer from 'react-dom/server'
import { isEmpty, forEach } from 'lodash'
import { InternalLink } from 'components'
import regexParam from 'regexparam'
import { TAGS } from 'html-urls'
import cheerio from 'cheerio'
import url from 'url'
import qsm from 'qsm'

import build from '../../build'
import { extension, resolveUrl, resolveAssetUrl } from './util'

const {
  REGEX_HTTP_PROTOCOL,
  SITE_URL,
  REGEX_LOCAL_URL,
  REGEX_START_WITH_LETTER_OR_NUMBER
} = require('../../../constants')

const { URL } = url

const { pattern: githubRegexParam } = regexParam('/:owner/:repo')

const loadHTML = html =>
  cheerio.load(html, {
    xmlMode: false,
    lowerCaseTags: true,
    decodeEntities: true,
    lowerCaseAttributeNames: true
  })

const withAnchorLinks = $ => {
  $('h1, h2, h3, h4, h5, h6').each(function () {
    const el = $(this)
    const text = el.text()
    const slug = el.attr('id')
    el.removeAttr('id')
    el.html(
      ReactDOMServer.renderToString(
        <>
          <span className='permalink-target' id={slug} />
          <InternalLink href={`#${slug}`} children={text} />
          <span className='permalink'>
            <Permalink width={12} ml={2} />
          </span>
        </>
      )
    )
  })
}

const withExternalIcon = $ => {
  $('a:not(a:has(img))').each(function () {
    const el = $(this)
    const href = el.attr('href') || ''

    const isInternalLink =
      href.startsWith('#') ||
      href.startsWith(SITE_URL) ||
      REGEX_LOCAL_URL.test(href) ||
      (!REGEX_HTTP_PROTOCOL.test(href) && REGEX_START_WITH_LETTER_OR_NUMBER.test(href))

    if (!isInternalLink) externalLink($(this))
  })
}

const createWithRelativeLinks = ({ isMarkdownPath }) => ($, { ref }) => {
  forEach(TAGS, (htmlTags, propName) => {
    $(htmlTags.join(',')).each(function () {
      const el = $(this)
      const attr = el.attr(propName)

      if (!isEmpty(attr)) {
        let urlObj

        try {
          urlObj = new URL(attr)
        } catch (err) {
          urlObj = {}
        }

        if (urlObj.hostname === 'github.com') {
          const { pathname } = urlObj
          // rewrite github markdown files urls into relative urls
          if (isMarkdownPath(pathname)) {
            el.attr(propName, resolveUrl(SITE_URL, pathname.replace(`tree/${ref}/`, '')))
          } else if (githubRegexParam.test(pathname)) {
            // rewrite other github repositories urls present in the markup
            // TODO: Add hash support?
            el.attr(propName, resolveUrl(SITE_URL, pathname))
          }
        }
      }
    })
  })
}

const externalLink = (el, { appendIcon = true } = {}) => {
  el.attr('rel', 'noopener noreferrer')
  el.attr('target', '_blank')
  if (appendIcon) {
    el.append(ReactDOMServer.renderToString(<ExternalLink />))
  }
}

const withZoomImages = ($, opts) => {
  $('img').each(function () {
    const el = $(this)
    const parentLink = el.closest('a')[0]
    if (!parentLink) {
      const src = el.attr('src')
      const extname = extension(src)
      if (imageExtensions.includes(extname)) {
        el.attr('src', qsm.add(resolveAssetUrl(src, opts), { sanitize: extname === 'svg' }))
      }
      el.attr('data-action', 'zoom')
    } else {
      externalLink($(parentLink), { appendIcon: false })
    }
  })
}

export default ({ isMarkdownPath }) => {
  const withRelativeLinks = createWithRelativeLinks({ isMarkdownPath })

  return async ({ source, markdown }) => {
    const { html, toc } = await build(markdown)
    const $ = loadHTML(html)

    withRelativeLinks($, source)
    withAnchorLinks($)
    withZoomImages($, source)
    withExternalIcon($)

    return {
      toc,
      html: $.html(),
      image: $('img').attr('src')
    }
  }
}
