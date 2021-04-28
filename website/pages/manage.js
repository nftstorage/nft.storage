import { useState } from 'react'
import Button from '../components/button.js'
import { deleteToken, getTokens } from '../lib/api'
import { useQuery, useQueryClient } from 'react-query'

export function getStaticProps() {
  return {
    props: {
      title: 'Manage API Keys - NFT Storage',
      navBgColor: 'nsgreen',
      needsUser: true,
    },
  }
}
export default function ManageKeys({ user }) {
  const [deleting, setDeleting] = useState(false)
  const queryClient = useQueryClient()
  const result = useQuery('get-tokens', getTokens, { enabled: !!user })
  async function handleDeleteToken(e) {
    e.preventDefault()
    if (!confirm('Are you sure? Deleted keys cannot be recovered!')) {
      return
    }
    const name = e.target.name.value
    setDeleting(name)
    try {
      await deleteToken(name)
    } finally {
      queryClient.invalidateQueries('get-tokens')
      setDeleting(false)
    }
  }

  return (
    <main className="bg-nsgreen">
      <div className="mw9 center pv3 ph3 ph5-ns min-vh-100">
        <div className="flex mb3 items-center">
          <h1 className="chicagoflf mv4 flex-auto">Manage API Keys</h1>
          <Button href="/new-key" className="flex-none">
            + New Key
          </Button>
        </div>
        {result.data ? (
          <table className="bg-white ba b--black w-100 collapse mb4">
            <thead>
              <tr className="bb b--black">
                <th className="pa2 tl bg-nsgray br b--black w-50">Name</th>
                <th className="pa2 tl bg-nsgray br b--black w-50">Key</th>
                <th className="pa2 tc bg-nsgray" />
              </tr>
            </thead>
            <tbody>
              {Object.entries(result.data).map((t, k) => (
                <tr className="bb b--black" key={k}>
                  <td className="pa2 br b--black">{t[0]}</td>
                  <td className="pa2 br b--black mw7">
                    <input
                      disabled
                      className="w-100 h2"
                      type="text"
                      id={`value-${t[0]}`}
                      value={t[1]}
                    />
                  </td>
                  <td className="pa2">
                    <form onSubmit={handleDeleteToken}>
                      <input
                        type="hidden"
                        name="name"
                        id={`token-${t[0]}`}
                        value={t[0]}
                      />
                      <Button
                        className="bg-nsorange white"
                        type="submit"
                        disabled={deleting}
                      >
                        {deleting === t[0] ? 'Deleting...' : 'Delete'}
                      </Button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
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
  )
}
