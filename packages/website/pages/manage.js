import { Else, If, Then, When } from 'react-if'
import { deleteToken, getTokens } from '../lib/api'
import { useEffect, useState } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import { Dialog } from '@headlessui/react'
import Button from '../components/button.js'
import Loading from '../components/loading.js'
import countly from '../lib/countly.js'

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
      altLogo: true,
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
  const [copied, setCopied] = useState('')
  const [pinReqestOpen, setPinReqestOpen] = useState(false)
  const queryClient = useQueryClient()
  const { status, data } = useQuery('get-tokens', () => getTokens(), {
    enabled: !!user,
    refetchOnWindowFocus: false,
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
        await deleteToken(name)
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

  const keys = []

  for (const key of data || []) {
    keys.push([key.name, key.secret, key.id])
  }

  return (
    <main className="bg-nsgreen flex-grow-1">
      <div className="mw9 center pv3 ph3 ph5-ns">
        <If condition={status === 'loading'}>
          <Then>
            <Loading></Loading>
          </Then>
          <Else>
            <div className="flex items-center mb3">
              <h1 className="flex-auto chicagoflf mv4">API Keys</h1>
              <Button
                className="flex-none mr3"
                id="request-api-pinning"
                onClick={() => setPinReqestOpen(true)}
              >
                Request API Pinning Access
              </Button>
              <Button
                href={{
                  pathname: '/new-key',
                }}
                className="flex-none"
                id="new-key"
                tracking={{ ui: countly.ui.TOKENS, action: 'New API Token' }}
              >
                + New Key
              </Button>
            </div>
            <When condition={keys.length > 0}>
              <div className="table-responsive">
                <table className="w-100 mb4">
                  <thead>
                    <tr className="bg-nsgray">
                      <th>Name</th>
                      <th>Key</th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {keys.map((t, k) => (
                      <tr className="bg-white bb" key={k}>
                        <td className="shrink-cell" data-label="Name">
                          {t[0]}
                        </td>
                        <td data-label="Key">
                          <input
                            disabled
                            className="h2 w-100 mt1"
                            type="text"
                            id={`value-${t[0]}`}
                            value={t[1]}
                          />
                        </td>
                        <td className="shrink-cell center-cell">
                          <div className="flex">
                            <form
                              data-value={t[1]}
                              onSubmit={handleCopyToken}
                              className="mr2"
                            >
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
                            <form onSubmit={handleDeleteToken}>
                              <input
                                type="hidden"
                                name="name"
                                id={`token-${t[0]}`}
                                value={`${t[2]}`}
                              />
                              <Button
                                type="submit"
                                variant="caution"
                                disabled={Boolean(deleting)}
                                id={`delete-key-${t[0]}`}
                                tracking={{
                                  event: countly.events.TOKEN_DELETE,
                                  ui: countly.ui.TOKENS,
                                }}
                              >
                                {deleting === `${t[2]}`
                                  ? 'Deleting...'
                                  : 'Delete'}
                              </Button>
                            </form>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
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

      <Dialog
        open={pinReqestOpen}
        onClose={() => setPinReqestOpen(false)}
        className="modal swagger-ui"
      >
        <div className="flex items-center justify-center min-vh-100">
          <Dialog.Overlay className="fixed inset-0 bg-black-0 min-vh-100 w-100" />
          <div className="modal-content relative bg-white max-w-sm mx-auto pa4">
            <button
              className="modal-close absolute chicagoflf top-0 right-0"
              onClick={() => setPinReqestOpen(false)}
            >
              <svg
                width="20px"
                height="20px"
                viewBox="0 0 12 12"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g transform="matrix(1.2,0,0,1.2,0,0)">
                  <path
                    d="M6.5 3.5L3.5 6.5"
                    fill="none"
                    stroke="#000000"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M3.5 3.5L6.5 6.5"
                    fill="none"
                    stroke="#000000"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M0.500 0.500 L9.500 0.500 L9.500 9.500 L0.500 9.500 Z"
                    fill="none"
                    stroke="#000000"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </g>
              </svg>
            </button>
            <Dialog.Title className={`chicagoflf`}>
              Request API Pinning Allowlist Access
            </Dialog.Title>
            <Dialog.Description>
              {/* This will permanently deactivate your account */}
              <form>
                <p className="mv4">
                  <label htmlFor="user-pin-request-why" className="f5 dib mb2">
                    Why you are looking for pinning service API access?{' '}
                    <small className="db black-50 mt1">
                      (e.g. you are an artist looking for extra redundancy)
                    </small>
                  </label>
                  <input
                    type="text"
                    id="user-pin-request-why"
                    name="user-pin-request-why"
                    className="w-100 db ba b--black w5 pa2"
                  />
                </p>
                <p className="mv4">
                  <label htmlFor="user-pin-request-cids" className="f5 dib mb2">
                    What metadata you are looking to pin?
                    <small className="db black-50 mt1">
                      (5-10 CIDs of NFTs)
                    </small>
                  </label>
                  <textarea
                    id="user-pin-request-cids"
                    name="user-pin-request-cids"
                    className="w-100 db ba b--black w5 pa2 textarea"
                  ></textarea>
                </p>
                <p className="mv4">
                  <label
                    htmlFor="user-pin-request-social"
                    className="f5 dib mb2"
                  >
                    Your profile on an NFT service (artist profile, collector,
                    etc.)
                  </label>
                  <input
                    type="text"
                    id="user-pin-request-social"
                    name="user-pin-request-social"
                    className="w-100 db ba b--black w5 pa2"
                  />
                </p>
                <p className="mt4 ml1 flex">
                  <Button
                    className="bg-nslime mt4"
                    type="submit"
                    id="create-new-key"
                    onClick={() => setPinReqestOpen(false)}
                  >
                    Submit Request
                  </Button>
                </p>
              </form>
            </Dialog.Description>
          </div>
        </div>
      </Dialog>
    </main>
  )
}
