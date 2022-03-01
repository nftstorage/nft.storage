import { useEffect } from 'react'

function ExternalRedirect({ url }) {
  useEffect(() => {
    window.location = url
  }, [])
  return <></>
}

export default ExternalRedirect
