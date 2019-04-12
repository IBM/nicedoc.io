import { promisify } from 'util'
import remarkHtml from 'remark-html'
import remark from 'remark'

import rehypePrism from '@mapbox/rehype-prism'
import rehypeSlug from 'rehype-slug'
import rehype from 'rehype'

const htmlRehype = rehype()
  .use(rehypeSlug)
  .use(rehypePrism, { ignoreMissing: true, preLangClass: false })

const htmlProcessor = promisify(htmlRehype.process)

export default async data => {
  const { contents: html } = await remark()
    .use(remarkHtml)
    .process(data)

  return htmlProcessor(html)
}
