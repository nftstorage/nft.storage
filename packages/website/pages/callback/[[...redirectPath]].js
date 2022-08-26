import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useQueryClient } from 'react-query'
import { redirectMagic, redirectSocial } from '../../lib/magic.js'
import { useUser } from 'lib/user.js'
import constants from 'lib/constants.js'

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

export function getStaticPaths() {
  return {
    paths: [
      { params: { redirectPath: [''] } }, // redirect to default
      ...Object.values(constants.AUTHENTICATED_ROUTES).map((route) => ({
        params: { redirectPath: [route] },
      })),
    ],
    fallback: false,
  }
}

const Callback = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  /** @type [string | undefined, any] */
  const [pendingRedirect, setPendingRedirect] = useState()
  const { user, handleIsLoggedIn } = useUser()

  const redirectPath = '/' + (router.query.redirectPath?.[0] ?? 'files')

  useEffect(() => {
    if (typeof pendingRedirect === 'string' && user) {
      router.push(pendingRedirect)
      setPendingRedirect()
    }
  }, [pendingRedirect, user, router])

  useEffect(() => {
    const finishSocialLogin = async () => {
      try {
        await redirectSocial()
        await queryClient.invalidateQueries('magic-user')
        handleIsLoggedIn()
        setPendingRedirect(redirectPath)
      } catch (err) {
        console.error(err)
        await queryClient.invalidateQueries('magic-user')
        router.push('/')
      }
    }
    const finishEmailRedirectLogin = async () => {
      try {
        await redirectMagic()
        await queryClient.invalidateQueries('magic-user')
        handleIsLoggedIn()
        setPendingRedirect(redirectPath)
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
  }, [router, router.query, queryClient, redirectPath, handleIsLoggedIn])

  // TODO handle errors
  return null
}

export default Callback
