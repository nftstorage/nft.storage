import '../styles/global.css'

import { QueryClient, QueryClientProvider } from 'react-query'
import Script from 'next/script'
import Layout from '../components/layout.js'
import { ReactQueryDevtools } from 'react-query/devtools'
import Router, { useRouter } from 'next/router'
import countly from '../lib/countly'
import { getUserTags, getUserRequests } from '../lib/api'
import { useCallback, useEffect, useState } from 'react'
import { isLoggedIn } from 'lib/magic'
import * as Sentry from '@sentry/nextjs'
import { UserContext } from 'lib/user'
import BlockedUploadsModal from 'components/blockedUploadsModal.js'
import Loading from 'components/loading'

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 60 * 1000 } },
})

/**
 * App Component
 *
 * @param {any} props
 */
export default function App({ Component, pageProps }) {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [isUserBlockedModalShowing, setIsUserBlockedModalShowing] =
    useState(false)

  const handleIsLoggedIn = useCallback(async () => {
    const data = await isLoggedIn()
    if (!data) return
    if (data) {
      // @ts-ignore
      Sentry.setUser(user)
    }
    const tags = await getUserTags()
    const pendingTagProposals = await getUserRequests()

    if (tags.HasAccountRestriction && !sessionStorage.hasSeenUserBlockedModal) {
      sessionStorage.hasSeenUserBlockedModal = true
      setIsUserBlockedModalShowing(true)
    }
    // @ts-ignore
    setUser({
      ...data,
      // @ts-ignore
      tags,
      pendingTagProposals,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    handleIsLoggedIn()
  }, [router, handleIsLoggedIn])

  useEffect(() => {
    if (!pageProps.redirectTo && pageProps.needsUser) {
      return
    }
    if (
      // If redirectTo is set, redirect if the user was not found.
      (pageProps.redirectTo && !pageProps.redirectIfFound && !user) ||
      // If redirectIfFound is also set, redirect if the user was found
      (pageProps.redirectIfFound && user)
    ) {
      router.push(pageProps.redirectTo)
    }
  }, [pageProps, user, router])

  useEffect(() => {
    Router.events.on('routeChangeComplete', (route) => {
      countly.trackPageView(route)
    })
  }, [])

  function handleClearUser() {
    setUser(null)
  }

  if (pageProps.needsUser && !user) {
    return <Loading />
  }

  return (
    <>
      <Script
        id="countly"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
(function() {
  var cly = document.createElement('script'); cly.type = 'text/javascript';
  cly.async = true;
  // Enter url of script here (see below for other option)
  cly.src = 'https://cdn.jsdelivr.net/npm/countly-sdk-web@latest/lib/countly.min.js';
  cly.onload = function(){Countly.init()};
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(cly, s);
})();
  `,
        }}
      />
      <QueryClientProvider client={queryClient}>
        <UserContext.Provider
          // @ts-ignore
          value={{ user, handleClearUser }}
        >
          <Layout {...pageProps}>
            {(props) => <Component {...pageProps} {...props} />}
          </Layout>
          {isUserBlockedModalShowing && (
            <BlockedUploadsModal
              onClose={() => setIsUserBlockedModalShowing(false)}
            />
          )}
        </UserContext.Provider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  )
}
