import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useQueryClient } from 'react-query'
import { redirectMagic, redirectSocial } from '../lib/magic.js'

/**
 *
 * @returns {{ props: import('../components/types.js').LayoutProps}}
 */
export function getStaticProps() {
  return {
    props: {
      title: 'Login Redirect - NFT Storage',
      callback: true,
      needsUser: false,
    },
  }
}

const Callback = () => {
  const router = useRouter()
  const version = /** @type {string} */ (router.query.version)
  const queryClient = useQueryClient()

  useEffect(() => {
    const finishSocialLogin = async () => {
      try {
        await redirectSocial(version)
        await queryClient.invalidateQueries('magic-user')
        router.push({ pathname: '/files', query: { version: '1' } })
      } catch (err) {
        console.error(err)
        await queryClient.invalidateQueries('magic-user')
        router.push({ pathname: '/', query: { version: '1' } })
      }
    }
    const finishEmailRedirectLogin = async () => {
      try {
        await redirectMagic(version)
        await queryClient.invalidateQueries('magic-user')
        router.push({ pathname: '/files', query: { version: '1' } })
      } catch (err) {
        console.error(err)
        await queryClient.invalidateQueries('magic-user')
        router.push({ pathname: '/', query: { version: '1' } })
      }
    }
    if (!router.query.provider && router.query.magic_credential) {
      finishEmailRedirectLogin()
    }
    if (router.query.provider) {
      finishSocialLogin()
    }
  }, [router, router.query, queryClient, version])

  // TODO handle errors
  return null
}

export default Callback
