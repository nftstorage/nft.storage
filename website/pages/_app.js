import { ReactQueryDevtools } from 'react-query/devtools'
import 'tachyons/css/tachyons.css'
import '../styles/global.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import Layout from '../components/layout.js'
const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 60 * 1000 } },
})

export default function App({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout {...pageProps}>
        {(props) => <Component {...pageProps} {...props} />}
      </Layout>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
