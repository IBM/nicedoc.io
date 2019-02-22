import remarkPreset from 'remark-preset-lint-recommended'
import { Permalink, ExternalLink } from 'components/icons'
import ReactDOMServer from 'react-dom/server'
import { shortnameToUnicode } from 'emojione'
import isRelativeUrl from 'is-relative-url'
import GitHubSlugger from 'github-slugger'
import fileExtension from 'file-extension'
import { isEmpty, forEach } from 'lodash'
import { InternalLink } from 'components'
import remarkHtml from 'remark-html'
import { TAGS } from 'html-urls'
import { Fragment } from 'react'
import cheerio from 'cheerio'
import remark from 'remark'
import url from 'url'
import qsm from 'qsm'

const extension = (str = '') => {
  const urlObj = url.parse(str)
  urlObj.hash = ''
  urlObj.search = ''
  return fileExtension(url.format(urlObj))
}

const remarkProcessor = remark()
  .use(remarkPreset)
  .use(remarkHtml)

const md2html = async md => {
  const { contents } = await remarkProcessor.process(md)
  return contents
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

export default ({ normalizeParams, fetchReadme }) => async query => {
  const { owner, repo, paths, ref } = normalizeParams(query)
  const response = await fetchReadme({ owner, repo, paths, ref })
  if (!response) throw new Error('Readme Not Found')

  const markdown = await response.text()
  const html = await md2html(markdown, { owner, repo })
  const $ = loadHTML(html)
  const slugger = new GitHubSlugger()

  // rewrite relative path into absolute
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

  // add anchor links
  $('h1, h2, h3, h4, h5, h6').each(function () {
    const el = $(this)
    const text = el.text()
    const slug = `${slugger.slug(text)}`
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

  const externalLink = (el, { appendIcon = true } = {}) => {
    el.attr('rel', 'noopener noreferrer')
    el.attr('target', '_blank')
    if (appendIcon) {
      el.append(ReactDOMServer.renderToString(<ExternalLink />))
    }
  }

  // zoom on images
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

  // add external icon for non internal urls
  $('a:not(a:has(img))').each(function () {
    const el = $(this)
    const href = el.attr('href') || ''
    if (!href.startsWith('#')) externalLink($(this))
  })

  const meta = {
    image: $('img').attr('src')
  }

  return { meta, html: shortnameToUnicode($.html()) }
}
