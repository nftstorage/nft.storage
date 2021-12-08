import { Else, If, Then, When } from 'react-if'
import { deleteToken, getTokens } from '../lib/api'
import { useEffect, useState } from 'react'
import { useQuery, useQueryClient } from 'react-query'

import Button from '../components/button.js'
import Loading from '../components/loading.js'
import countly from '../lib/countly.js'
import { useRouter } from 'next/router'

/**
 *
 * @returns {{ props: import('../components/types.js').LayoutProps}}
 */
export function getStaticProps() {
  return {
    props: {
      title: 'Manage API Keys - NFT Storage',
      description: 'Manage your NFT.Storage account',
      navBgColor: 'bg-nsgreen',
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
  const router = useRouter()
  const version = /** @type {string} */ (router.query.version)
  const [deleting, setDeleting] = useState('')
  const [copied, setCopied] = useState('')
  const queryClient = useQueryClient()
  const { status, data } = useQuery('get-tokens', () => getTokens(version), {
    enabled: !!user,
  })
  useEffect(() => {
    if (!copied) return
    const timer = setTimeout(() => setCopied(''), 5000)
    return () => clearTimeout(timer)
  }, [copied])
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
        await deleteToken(name, version)
      } finally {
        await queryClient.invalidateQueries('get-tokens')
        setDeleting('')
      }
    }
  }

  /**
   * @param {import('react').ChangeEvent<HTMLFormElement>} e
   */
  async function handleCopyToken(e) {
    e.preventDefault()
    const key = e.target.dataset.value
    if (!key) throw new Error('missing key value')
    await navigator.clipboard.writeText(key)
    setCopied(key)
  }

  let keys = []
  if (version === '0') {
    keys = Object.entries(data || {})
  } else {
    for (const key of data || []) {
      keys.push([key.name, key.secret, key.id])
    }
  }

  return (
    <main className="bg-nsgreen">
      <div className="mw9 center pv3 ph3 ph5-ns min-vh-100">
        <If condition={status === 'loading'}>
          <Then>
            <Loading></Loading>
          </Then>
          <Else>
            <div className="flex items-center mb3">
              <h1 className="flex-auto chicagoflf mv4">API Keys</h1>
              <Button
                href={{
                  pathname: '/new-key',
                  query: version ? { version } : null,
                }}
                className="flex-none"
                id="new-key"
                tracking={{ ui: countly.ui.TOKENS, action: 'New API Token' }}
              >
                + New Key
              </Button>
            </div>
            <When condition={keys.length > 0}>
              <table className="bg-white ba b--black w-100 collapse mb4">
                <thead>
                  <tr className="bb b--black">
                    <th className="pa2 tl bg-nsgray br b--black w-50">Name</th>
                    <th className="pa2 tl bg-nsgray br b--black w-50">Key</th>
                    <th colSpan={2} className="pa2 tc bg-nsgray" />
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
                      <td className="flex flex-wrap pa2">
                        <form data-value={t[1]} onSubmit={handleCopyToken}>
                          <Button
                            className="bg-white black"
                            type="submit"
                            id="copy-key"
                            tracking={{
                              event: countly.events.TOKEN_COPY,
                              ui: countly.ui.TOKENS,
                            }}
                          >
                            {copied === t[1] ? 'Copied!' : 'Copy'}
                          </Button>
                        </form>
                      </td>
                      <td className="pa2">
                        <form onSubmit={handleDeleteToken}>
                          <input
                            type="hidden"
                            name="name"
                            id={`token-${t[0]}`}
                            value={version === '0' ? t[0] : `${t[2]}`}
                          />
                          <Button
                            className="bg-nsorange white"
                            type="submit"
                            variant="caution"
                            disabled={Boolean(deleting)}
                            id={`delete-key-${t[0]}`}
                            tracking={{
                              event: countly.events.TOKEN_DELETE,
                              ui: countly.ui.TOKENS,
                            }}
                          >
                            {deleting === (version === '0' ? t[0] : `${t[2]}`)
                              ? 'Deleting...'
                              : 'Delete'}
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
