import { useState } from 'react'
import { If, Then, Else, When } from 'react-if'
import Button from '../components/button.js'
import { deleteToken, getTokens } from '../lib/api'
import { useQuery, useQueryClient } from 'react-query'
import Loading from '../components/loading.js'

/**
 *
 * @returns {{ props: import('../components/types.js').LayoutProps}}
 */
export function getStaticProps() {
  return {
    props: {
      title: 'Manage API Keys - NFT Storage',
      navBgColor: 'nsgreen',
      redirectTo: '/',
      needsUser: true,
    },
  }
}

/**
 *
 * @param {import('../components/types.js').LayoutChildrenProps} props
 * @returns
 */
export default function ManageKeys({ user }) {
  const [deleting, setDeleting] = useState('')
  const queryClient = useQueryClient()
  const { status, data } = useQuery('get-tokens', getTokens, {
    enabled: !!user,
  })
  /**
   * @param {import('react').ChangeEvent<HTMLFormElement>} e
   */
  async function handleDeleteToken(e) {
    e.preventDefault()
    const data = new FormData(e.target)
    const name = data.get('name')
    if (name && typeof name === 'string') {
      if (!confirm('Are you sure? Deleted keys cannot be recovered!')) {
        return
      }

      setDeleting(name)

      try {
        await deleteToken(name)
      } finally {
        await queryClient.invalidateQueries('get-tokens')
        setDeleting('')
      }
    }
  }

  const keys = Object.entries(data || {})

  return (
    <main className="bg-nsgreen">
      <div className="mw9 center pv3 ph3 ph5-ns min-vh-100">
        <If condition={status === 'loading'}>
          <Then>
            <Loading></Loading>
          </Then>
          <Else>
            <div className="flex mb3 items-center">
              <h1 className="chicagoflf mv4 flex-auto">API Keys</h1>
              <Button href="/new-key" className="flex-none">
                + New Key
              </Button>
            </div>
            <When condition={keys.length > 0}>
              <table className="bg-white ba b--black w-100 collapse mb4">
                <thead>
                  <tr className="bb b--black">
                    <th className="pa2 tl bg-nsgray br b--black w-50">Name</th>
                    <th className="pa2 tl bg-nsgray br b--black w-50">Key</th>
                    <th className="pa2 tc bg-nsgray" />
                  </tr>
                </thead>
                <tbody>
                  {keys.map((t, k) => (
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
                            disabled={Boolean(deleting)}
                          >
                            {deleting === t[0] ? 'Deleting...' : 'Delete'}
                          </Button>
                        </form>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </When>
            <When condition={keys.length === 0}>
              <p className="tc mv5">
                <span className="f1 dib mb3">😢</span>
                <br />
                No API keys
              </p>
            </When>
          </Else>
        </If>
      </div>
    </main>
  )
}
