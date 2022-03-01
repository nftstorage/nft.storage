import 'tachyons/css/tachyons.css'
import '../styles/global.css'

import { QueryClient, QueryClientProvider } from 'react-query'
import Script from 'next/script'
import Layout from '../components/layout.js'
import { ReactQueryDevtools } from 'react-query/devtools'
import Router from 'next/router'
import countly from '../lib/countly'
import { useEffect } from 'react'

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 60 * 1000 } },
})

/**
 * App Component
 *
 * @param {any} props
 */
export default function App({ Component, pageProps }) {
  useEffect(() => {
    Router.events.on('routeChangeComplete', (route) => {
      countly.trackPageView(route)
    })
  }, [])

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
        <Layout {...pageProps}>
          {(props) => <Component {...pageProps} {...props} />}
        </Layout>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  )
}
