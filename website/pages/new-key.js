import useSWR from 'swr'
import Box from '../components/box.js'
import Button from '../components/button.js'
import { getEdgeState } from '../lib/state.js'
import Layout from '../components/layout.js'

export default function NewKey () {
  const { data } = useSWR('edge_state', getEdgeState)
  const { user, loginUrl = '#' } = data ?? {}

  return (
    <Layout user={user} loginUrl={loginUrl} navBgColor='nsgreen' title='New API key - NFT storage'>
      <main className='bg-nsgreen'>
        <div className='mw9 center pv3 ph5 min-vh-100'>
          <Box
            bgColor="nsgray"
            borderColor="nspink"
            wrapperClassName="center mv4 mw6"
          >
            <h1 className="chicagoflf f4 fw4">New API Key</h1>
            <form onSubmit={handleCreateToken}>
              <div className="mv3">
                <label htmlFor="name" className="dib mb2">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  placeholder="Give this API key a name"
                  className="db ba b--black w5 pa2"
                  required
                />
              </div>
              <div>
                <Button className="bg-nslime" type="submit">
                  Create
                </Button>
              </div>
            </form>
          </Box>
        </div>
      </main>
    </Layout>
  )
}

async function handleCreateToken (e) {
  e.preventDefault()
  const name = e.target.name.value
  const rsp = await fetch('/api/internal/tokens', {
    method: 'post',
    body: JSON.stringify({ name }),
  })
  const data = await rsp.json()
  if (!data.ok) {
    throw new Error(`creating token: ${data.error}`)
  }
  location = '/manage'
}
