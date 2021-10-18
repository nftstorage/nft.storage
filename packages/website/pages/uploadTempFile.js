import { useEffect } from 'react'
import Router from 'next/router'
import { getToken } from '../lib/api'

/**
 *
 * @returns {{ props: import('../components/types.js').LayoutProps}}
 */
export function getStaticProps() {
  return {
    props: {
      needsUser: true,
    },
  }
}

export default function UploadTempFile() {
  useEffect(() => {
    const getTokenAndRedirect = async () => {
      const token = await getToken()
      const tempFilePath = new URLSearchParams(window.location.search).get(
        'tempFilePath'
      )
      Router.push(
        `/api/uploadWithToken?token=${token}&tempFilePath=${tempFilePath}`
      )
    }
    getTokenAndRedirect()
  })
  return <div></div>
}
