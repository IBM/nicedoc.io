import { useState, useEffect } from 'react'
import fromEntries from 'fromentries'

export const useQueryState = () => {
  const [urlSearchParams, setUrlSearchParams] = useState(new URLSearchParams())
  useEffect(() => {
    setUrlSearchParams(new URLSearchParams(window.location.search))
  }, [global.window ? window.location.search : undefined])

  const query = fromEntries(urlSearchParams.entries())

  const setQuery = (obj = {}) => {
    Object.keys(obj).forEach(key => urlSearchParams.set(key, obj[key]))
    window.history.replaceState({}, null, `?${urlSearchParams.toString()}`)
  }

  return [query, setQuery]
}
