export default ({ fetchReadme }) => async ({ paths, ...opts }) => {
  for (const path of paths) {
    const response = await fetchReadme({ ...opts, path })
    if (response.status === 200) return { response, path }
  }
  return {}
}
