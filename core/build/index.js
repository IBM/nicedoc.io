import remarkStringify from 'remark-stringify'
import remarkEmoji from 'remark-emoji'
import remarkParse from 'remark-parse'

import rehypeStringify from 'rehype-stringify'
import rehypePrism from '@mapbox/rehype-prism'
import remarkRehype from 'remark-rehype'
import rehypeSlug from 'rehype-slug'

import unified from 'unified'

import toTOC from './toc'

const toMarkdown = unified()
  .use(remarkParse)
  .use(remarkEmoji)
  .use(remarkStringify)

const toHTML = unified()
  .use(remarkParse)
  .use(remarkRehype)
  .use(rehypeSlug)
  .use(rehypePrism, { ignoreMissing: true, preLangClass: false })
  .use(rehypeStringify)

export default async data => {
  const { contents: markdown } = await toMarkdown.process(data)
  const { contents: toc } = await toHTML.process(await toTOC.process(markdown))
  const { contents: html } = await toHTML.process(markdown)

  return { html: String(html), toc: String(toc) }
}
