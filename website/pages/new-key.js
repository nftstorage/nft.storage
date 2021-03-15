import Head from 'next/head'
import Navbar from '../components/navbar.js'
import Footer from '../components/footer.js'
import Box from '../components/box.js'
import Button from '../components/button.js'
import { getEdgeState } from '../lib/state.js'

export default function NewKey ({ user, loginUrl = '#' }) {
  return (
    <div className='sans-serif'>
      <Head>
        <title>New API Key</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Navbar user={user} loginUrl={loginUrl} />
      <main className='mw9 center bg-nspeach pv3 ph5 min-vh-100'>
        <Box bgColor='nsgray' borderColor='nspink' wrapperClassName='center mv4 mw6'>
          <h1 className='chicagoflf f4 fw4'>New API Key</h1>
          <form action='/keys' method='POST'>
            <div className='mv3'>
              <label for='name' className='dib mb2'>Name</label>
              <input id='name' name='name' placeholder='Give this API key a name' className='db ba b--black w5 pa2' required />
            </div>
            <div>
              <Button className='bg-nslime' type='submit'>Create</Button>
            </div>
          </form>
        </Box>
      </main>
      <Footer />
    </div>
  )
}

export async function getStaticProps() {
  return {
    props: getEdgeState(),
    revalidate: 1 // In seconds
  }
}
