import fileExtension from 'file-extension'
import isRelativeUrl from 'is-relative-url'
import url, { URL } from 'url'

export const isGithubUrl = url => {
  try {
    return new URL(url).hostname === 'github.com'
  } catch (err) {
    return false
  }
}

export const resolveAssetUrl = (src, { path, owner, repo, ref }) => {
  const slug = `${owner}/${repo}`
  if (!path.startsWith('/')) path = `/${path}`

  if (isRelativeUrl(src)) {
    const base = `https://raw.githubusercontent.com/${slug}/${ref}${path}`
    if (src.startsWith('/')) src = src.substring(1)
    return url.resolve(base, src)
  }

  if (!isGithubUrl(src)) return src

  return src.replace('github.com', 'raw.githubusercontent.com').replace('blob/', '')
}

export const resolveUrl = (from, to) => {
  url.resolve(from, to)
}

export const extension = (str = '') => {
  const urlObj = url.parse(str)
  urlObj.hash = ''
  urlObj.search = ''
  return fileExtension(url.format(urlObj))
}
