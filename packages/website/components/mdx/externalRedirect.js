import { useEffect } from 'react'

/**
 * @typedef {Object} ExternalRedirect
 * @prop {string} [url]
 */

/**
 *
 * @param {ExternalRedirect} props
 * @returns
 */
function ExternalRedirect(props) {
  const { url } = props
  useEffect(() => {
    window.location = url
  }, [])
  return <></>
}

export default ExternalRedirect
