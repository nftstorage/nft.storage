import { useEffect } from 'react'
import { isLoggedIn } from './magic.js'
import { useQuery } from 'react-query'
import { useRouter } from 'next/router'
// import * as Sentry from '@sentry/nextjs'

/**
 * User Hook
 *
 * @param {Object} options
 * @param {string} [options.redirectTo]
 * @param {boolean} [options.redirectIfFound]
 * @param {boolean} [options.enabled]
 * @returns
 */
export function useUser({ redirectTo, redirectIfFound, enabled } = {}) {
  const router = useRouter()
  const { status, data, error, isFetching } = useQuery(
    'magic-user',
    isLoggedIn,
    { enabled }
  )
  const hasUser = data
  // if (user) {
  //   // @ts-ignore
  //   Sentry.setUser(user)
  // }

  useEffect(() => {
    if (!redirectTo || status === 'loading') {
      return
    }
    if (
      // If redirectTo is set, redirect if the user was not found.
      (redirectTo && !redirectIfFound && !hasUser) ||
      // If redirectIfFound is also set, redirect if the user was found
      (redirectIfFound && hasUser)
    ) {
      router.push(redirectTo)
    }
  }, [redirectTo, redirectIfFound, status, hasUser, router, enabled])

  return { status, error, isFetching }
}
