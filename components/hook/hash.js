import React, { useState, useEffect, useContext } from 'react'

const HashContext = React.createContext('')

const getHash = () => window.location.hash

export function useCurrentHash () {
  return useContext(HashContext)
}

export function HashContextProvider (props) {
  const [hash, setHash] = useState('')
  useEffect(() => {
    const hashChange = () => {
      const newHash = getHash()
      if (hash !== newHash) {
        setHash(newHash)
      }
    }
    window.document.addEventListener('scrollStart', hashChange)
    return () => window.document.removeEventListener('scrollStart', hashChange)
  }, [])

  return <HashContext.Provider value={hash}>{props.children}</HashContext.Provider>
}
