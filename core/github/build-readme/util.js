import fileExtension from 'file-extension'
import url from 'url'

export const resolveAssetUrl = (src, { path, owner, repo, ref }) => {
  if (!path.startsWith('/')) path = `/${path}`
  const slug = `${owner}/${repo}`
  const base = `https://raw.githubusercontent.com/${slug}/${ref}${path}`
  return url.resolve(base, src)
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
