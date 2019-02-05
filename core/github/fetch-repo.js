import fetch from 'isomorphic-unfetch'

export default ({ GITHUB_TOKEN }) => ({ owner, repo }) =>
  fetch(`https://api.github.com/repos/${owner}/${repo}`, {
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`
    }
  })
