import { join as pathJoin } from 'path'
import regexParam from 'regexparam'
import { isEmpty } from 'lodash'

import fetch from 'isomorphic-unfetch'

const githubBlobUrl = regexParam('blob/:ref/*')

const exec = (path, result) => {
  let i = 0
  const out = {}
  const matches = result.pattern.exec(path) || {}
  while (i < result.keys.length) out[result.keys[i]] = matches[++i] || null
  return out
}

export default ({ isMarkdownPath, GITHUB_TOKEN, ALTERNATIVE_README_NAMES }) => {
  const fetchReadme = ({ owner, repo, path, ref }) => {
    return fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${ref}`, {
      headers: {
        Accept: 'application/vnd.github.v3.raw',
        Authorization: `token ${GITHUB_TOKEN}`
      }
    })
  }

  const fetchRepo = async ({ owner, repo }) => {
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`
      }
    })

    return response.json()
  }

  const fetchReadmeFromSource = async ({ owner, repo, ref, paths }) => {
    for (const path of paths) {
      const response = await fetchReadme({ owner, repo, ref, path })

      if (response.status === 200) {
        const markdown = await response.text()
        return { markdown, path }
      }
    }

    return {}
  }

  return async ({ owner, repo, path = '' }) => {
    let ref

    if (!isEmpty(path)) {
      const execResult = exec(`/${path}`, githubBlobUrl)
      if (execResult.ref) {
        ref = execResult.ref
        path = path.replace(`blob/${ref}`, '')
      }
    } else if (repo.includes('@')) {
      ;[repo, ref] = repo.split('@')
    }

    const paths = isMarkdownPath(path)
      ? [path]
      : ALTERNATIVE_README_NAMES.map(readmeName => pathJoin(path, readmeName))

    const info = await fetchRepo({ owner, repo })
    if (!ref) ref = info.default_branch

    const { markdown, path: inferPath } = await fetchReadmeFromSource({ owner, repo, paths, ref })
    const source = { path: inferPath, owner, repo, paths, ref }

    return { markdown, source, ...info }
  }
}
