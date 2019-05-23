import remarkStringify from 'remark-stringify'
import remarkSlug from 'remark-slug'
import remarkParse from 'remark-parse'
import mdastToc from 'mdast-util-toc'
import unified from 'unified'

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

function generateTocFromContent (node) {
  return mdastToc(node, {
    maxDepth: 6,
    tight: true,
    prefix: 'user-content-'
  })
}

export default unified()
  .use(remarkParse)
  .use(remarkSlug)
  .use(toc)
  .use(remarkStringify)
