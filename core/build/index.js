// import sanitizeGithubPreset from 'hast-util-sanitize/lib/github'
import remarkStringify from 'remark-stringify'
// import rehypeSanitize from 'rehype-sanitize'
import remarkEmoji from 'remark-emoji'
import remarkParse from 'remark-parse'
import rehypeSlug from 'rehype-slug'
import rehypeRaw from 'rehype-raw'

import rehypeStringify from 'rehype-stringify'
import rehypePrism from '@mapbox/rehype-prism'
import remarkRehype from 'remark-rehype'

import unified from 'unified'

import toTOC from './toc'

const toMarkdown = unified()
  .use(remarkParse)
  .use(remarkEmoji)
  .use(remarkStringify)

const toHTML = unified()
  .use(remarkParse)
  .use(remarkRehype, { allowDangerousHTML: true })
  .use(rehypeRaw)
  .use(rehypeSlug)
  .use(rehypePrism, { ignoreMissing: true })
  // .use(rehypeSanitize, sanitizeGithubPreset)
  .use(rehypeStringify)

export default async data => {
  const { contents: markdown } = await toMarkdown.process(data)
  const { contents: toc } = await toHTML.process(await toTOC.process(markdown))
  const { contents: html } = await toHTML.process(markdown)
  return { html: String(html), toc: String(toc) }
}
