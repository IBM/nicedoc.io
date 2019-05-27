import { useEffect } from 'react'

const getHash = () => window.location.hash

let currentHash

export default fn => {
  useEffect(() => {
    window.document.addEventListener(
      'scrollStart',
      () => {
        const hash = getHash()
        if (hash !== currentHash) {
          currentHash = hash
          fn(hash)
        }
      },
      false
    )
  }, [])
}
