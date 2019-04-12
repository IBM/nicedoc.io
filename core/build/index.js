import toMarkdown from './markdown'
import toHtml from './html'
import toTOC from './toc'

export default async data => {
  const markdown = await toMarkdown(data)

  const toc = await toHtml(await toTOC(markdown))

  const html = await toHtml(markdown)

  return {
    html: String(html),
    toc: String(toc)
  }
}
