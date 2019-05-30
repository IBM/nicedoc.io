import { useEffect } from 'react'

const getHash = () => window.location.hash

let currentHash

export default fn => {
  useEffect(() => {
    const hashChange = () => {
      const hash = getHash()
      if (hash !== currentHash) {
        currentHash = hash
        fn(hash)
      }
    }

    window.document.addEventListener('scrollStart', hashChange)
    return () => window.document.removeEventListener('scrollStart', hashChange)
  }, [])
}
