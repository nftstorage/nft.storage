import useSWR from 'swr'
import Button from '../components/button.js'
import Layout from '../components/layout.js'
import { getEdgeState } from '../lib/state.js'

export default function ManageKeys() {
  const { data } = useSWR('edge_state', getEdgeState)
  const { user, loginUrl = '#' } = data ?? {}
  const tokens = user
    ? Object.keys(user.tokens).map((k) => ({ name: k, token: user.tokens[k] }))
    : []

  return (
    <Layout
      user={user}
      loginUrl={loginUrl}
      navBgColor="nsgreen"
      title="Manage API Keys - NFT Storage"
    >
      <main className="bg-nsgreen">
        <div className="mw9 center pv3 ph5 min-vh-100">
          <div className="flex mb3 items-center">
            <h1 className="chicagoflf mv4 flex-auto">Manage API Keys</h1>
            <Button href="/new-key" className="flex-none">
              + New Key
            </Button>
          </div>
          {tokens.length ? (
            <table className="bg-white ba b--black w-100 collapse mb4">
              <tr className="bb b--black">
                <th className="pa2 tl bg-nsgray br b--black w-50">Name</th>
                <th className="pa2 tl bg-nsgray br b--black w-50">Key</th>
                <th className="pa2 tc bg-nsgray" />
              </tr>
              {tokens.map((t) => (
                <tr className="bb b--black">
                  <td className="pa2 br b--black">{t.name}</td>
                  <td className="pa2 br b--black mw7">
                    <code style={{ wordWrap: 'break-word' }}>{t.token}</code>
                  </td>
                  <td className="pa2">
                    <form onSubmit={handleDeleteToken}>
                      <input
                        type="hidden"
                        name="name"
                        id="name"
                        value={t.name}
                      />
                      <Button className="bg-nsorange white" type="submit">
                        Delete
                      </Button>
                    </form>
                  </td>
                </tr>
              ))}
            </table>
          ) : (
            <p className="tc mv5">
              <span className="f1 dib mb3">😢</span>
              <br />
              No API keys
            </p>
          )}
        </div>
      </main>
    </Layout>
  )
}

async function handleDeleteToken(e) {
  e.preventDefault()
  if (!confirm('Are you sure? Deleted keys cannot be recovered!')) {
    return
  }
  const name = e.target.name.value
  const rsp = await fetch('/api/internal/tokens', {
    method: 'delete',
    body: JSON.stringify({ name }),
  })
  const data = await rsp.json()
  if (!data.ok) {
    throw new Error(`deleting token: ${data.error}`)
  }
  location = '/manage'
}
