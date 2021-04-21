import { ReactQueryDevtools } from 'react-query/devtools'
import 'tachyons/css/tachyons.css'
import '../styles/global.css'
import { AppWrapper } from './../lib/user'
import { QueryClient, QueryClientProvider } from 'react-query'
const queryClient = new QueryClient()

export default function App({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AppWrapper>
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen={false} />
      </AppWrapper>
    </QueryClientProvider>
  )
}
