import { Permalink, ExternalLink } from 'components/icons'
import ReactDOMServer from 'react-dom/server'
import isRelativeUrl from 'is-relative-url'
import fileExtension from 'file-extension'
import { isEmpty, forEach } from 'lodash'
import { InternalLink } from 'components'
import { promisify } from 'util'
import { TAGS } from 'html-urls'
import { Fragment } from 'react'
import cheerio from 'cheerio'
import url from 'url'
import qsm from 'qsm'

import remarkPreset from 'remark-preset-lint-recommended'
import remarkHtml from 'remark-html'
import remarkEmoji from 'remark-emoji'

import remark from 'remark'

import rehype from 'rehype'
import rehypeSlug from 'rehype-slug'

const extension = (str = '') => {
  const urlObj = url.parse(str)
  urlObj.hash = ''
  urlObj.search = ''
  return fileExtension(url.format(urlObj))
}

const htmlBuilder = rehype().use(rehypeSlug)

const toHTML = promisify(htmlBuilder.process)

const build = async markdown => {
  const { contents: normalizedHtmlFromMarkdown } = await remark()
    .use(remarkPreset)
    .use(remarkEmoji)
    .use(remarkHtml)
    .process(markdown)

  const file = await toHTML(normalizedHtmlFromMarkdown)
  return String(file)
}

const loadHTML = html =>
  cheerio.load(html, {
    xmlMode: false,
    lowerCaseTags: true,
    decodeEntities: true,
    lowerCaseAttributeNames: true
  })

const resolveUrl = (from, to) => {
  if (to[0] === '/') to = to.substr(1)
  return url.resolve(from, to)
}

const withAnchorLinks = $ => {
  $('h1, h2, h3, h4, h5, h6').each(function () {
    const el = $(this)
    const text = el.text()
    const slug = el.attr('id')
    el.removeAttr('id')
    el.html(
      ReactDOMServer.renderToString(
        <Fragment>
          <span className='permalink-target' id={slug} />
          <InternalLink href={`#${slug}`} children={text} />
          <span className='permalink'>
            <Permalink width={16} ml={2} />
          </span>
        </Fragment>
      )
    )
  })
}

const withExternalIcon = $ => {
  $('a:not(a:has(img))').each(function () {
    const el = $(this)
    const href = el.attr('href') || ''
    if (!href.startsWith('#')) externalLink($(this))
  })
}

const withRelativeLinks = ($, { owner, repo, ref }) => {
  forEach(TAGS, (htmlTags, propName) => {
    $(htmlTags.join(',')).each(function () {
      const el = $(this)
      const attr = el.attr(propName)
      if (!isEmpty(attr) && isRelativeUrl(attr)) {
        el.attr(
          propName,
          resolveUrl(`https://raw.githubusercontent.com/${owner}/${repo}/${ref}/`, attr)
        )
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

const withZoomImages = $ => {
  $('img').each(function () {
    const el = $(this)
    const parentLink = el.closest('a')[0]
    if (!parentLink) {
      const src = el.attr('src')
      if (extension(src) === 'svg') {
        el.attr('src', qsm.add(src, { sanitize: true }))
      }
      el.attr('data-action', 'zoom')
    } else {
      externalLink($(parentLink), { appendIcon: false })
    }
  })
}

export default ({ normalizeParams, fetchReadme }) => async query => {
  const { owner, repo, paths, ref } = normalizeParams(query)
  const response = await fetchReadme({ owner, repo, paths, ref })
  if (!response) throw new Error('Readme Not Found')

  const markdown = await response.text()
  const html = await build(markdown)
  const $ = loadHTML(html)

  withRelativeLinks($, { owner, repo, ref })
  withAnchorLinks($)
  withZoomImages($)
  withExternalIcon($)

  const meta = { image: $('img').attr('src') }
  return { meta, html: $.html() }
}
