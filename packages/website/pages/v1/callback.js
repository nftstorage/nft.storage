import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useQueryClient } from 'react-query'
import { redirectMagicV1, redirectSocialV1 } from '../../lib/magic.js'

/**
 *
 * @returns {{ props: import('../../components/types.js').LayoutProps}}
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
  const queryClient = useQueryClient()
  useEffect(() => {
    const finishSocialLogin = async () => {
      try {
        await redirectSocialV1()
        await queryClient.invalidateQueries('magic-user')
        router.push('/files')
      } catch (err) {
        console.error(err)
        await queryClient.invalidateQueries('magic-user')
        router.push('/')
      }
    }
    const finishEmailRedirectLogin = async () => {
      try {
        await redirectMagicV1()
        await queryClient.invalidateQueries('magic-user')
        router.push('/files')
      } catch (err) {
        console.error(err)
        await queryClient.invalidateQueries('magic-user')
        router.push('/')
      }
    }
    if (!router.query.provider && router.query.magic_credential) {
      finishEmailRedirectLogin()
    }
    if (router.query.provider) {
      finishSocialLogin()
    }
  }, [router, router.query, queryClient])

  // TODO handle errors
  return null
}

export default Callback
