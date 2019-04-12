import remarkPreset from 'remark-preset-lint-recommended'
import remarkEmoji from 'remark-emoji'
import remark from 'remark'

export default async data => {
  const { contents: markdown } = await remark()
    .use(remarkPreset)
    .use(remarkEmoji)
    .process(data)

  return markdown
}
