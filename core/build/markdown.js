import remarkEmoji from 'remark-emoji'
import remark from 'remark'

export default async data => {
  const { contents: markdown } = await remark()
    .use(remarkEmoji)
    .process(data)

  return markdown
}
