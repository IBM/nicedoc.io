import remark from 'remark'
import remarkStringify from 'remark-stringify'
import mdastToc from 'mdast-util-toc'
import slug from 'remark-slug'

const remarkProcessor = remark()
  .use(slug)
  .use(toc)
  .use(remarkStringify)

export function getTableOfContents (md) {
  return remarkProcessor.process(md)
}

function toc () {
  return function transformer (node) {
    const existingToc = findExistingToc(node)
    if (existingToc) {
      node.children = existingToc
    } else {
      const result = generateTocFromContent(node)
      if (result.map) {
        node.children = [result.map]
      } else {
        node.children = []
      }
    }
  }
}

function findExistingToc (root) {
  let addToToc = false
  let toc = null
  root.children.forEach(node => {
    if (node.type === 'heading' && node.data.id === 'table-of-contents') {
      addToToc = true
      toc = []
    } else if (addToToc) {
      if (node.type !== 'heading') {
        toc.push(node)
      } else {
        addToToc = false
      }
    }
  })
  return toc
}

function generateTocFromContent(node) {
  const maxDepth = 6
  const tight = true
  const result = mdastToc(node, {
    maxDepth: maxDepth,
    tight: tight
  })
  return result;
}
