import { Else, If, Then, When } from 'react-if'
import { deleteToken, getTokens } from '../lib/api'
import { useEffect, useState } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import Button from '../components/button.js'
import Loading from '../components/loading.js'
import Tooltip from '../components/tooltip.js'
import countly from '../lib/countly.js'
import { VscMail } from 'react-icons/vsc'
import { Popover, ArrowContainer } from 'react-tiny-popover'
import Link from '../components/link'

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
  const [isActionMenuOpen, setIsActionMenuOpen] = useState('')
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

  const NewKeyButton = () => (
    <Button
      href={{
        pathname: '/new-key',
      }}
      className="flex-none mb2"
      disabled={user?.tags.HasAccountRestriction}
      id="new-key"
      tracking={{ ui: countly.ui.TOKENS, action: 'New API Token' }}
    >
      + New Key
    </Button>
  )

  return (
    <main className="bg-nsgreen grow">
      <div className="max-w-7xl mx-auto py-4 px-6 sm:px-16">
        <If condition={status === 'loading'}>
          <Then>
            <Loading></Loading>
          </Then>
          <Else>
            <div className="flex flex-wrap items-center mb-4">
              <h1 className="flex-auto chicagoflf my-8">API Keys</h1>
              <div className="flex flex-wrap items-center mt-2">
                {!user?.tags.HasAccountRestriction &&
                  !user?.tags.HasPsaAccess &&
                  !user?.pendingTagProposals?.HasPsaAccess && (
                    <Tooltip
                      placement="bottom"
                      overlay={
                        <span>
                          The Pinning Service API is for users who want to take
                          data that is not yet stored with NFT.Storage but
                          already available on the IPFS network and store
                          additional copies via NFT.Storage. You do not need to
                          request Pinning Service API access if you are just
                          looking to upload your data to NFT.Storage. Check out
                          the docs for more details.
                        </span>
                      }
                      overlayClassName="ns-tooltip"
                      id="request-api-pinning-info"
                    >
                      <Link
                        href="/pinning-request"
                        className="items-center mr-4 btn button-reset select-none black py-2 px-4 hologram chicagoflf interactive light"
                        id="request-api-pinning"
                      >
                        <VscMail size={12} className="mr-2" /> Request API
                        Pinning Access
                      </Link>
                    </Tooltip>
                  )}

                {user?.tags.HasAccountRestriction ? (
                  <Tooltip
                    id="blocked-new-key-booltip"
                    placement="left"
                    overlay={
                      <span style={{ width: 160 }}>
                        You are unable to create new API Keys when your account
                        is blocked. Please contact support@nft.storage
                      </span>
                    }
                  >
                    <span style={{ paddingLeft: 10 }}>
                      <NewKeyButton />
                    </span>
                  </Tooltip>
                ) : (
                  <NewKeyButton />
                )}
              </div>
            </div>
            <When condition={keys.length > 0}>
              <div className="table-responsive">
                <table className="w-full mb-8">
                  <thead>
                    <tr className="bg-nsgray">
                      <th>Name</th>
                      <th>Key</th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {keys.map((t, k) => (
                      <tr className="bg-white border-b" key={k}>
                        <td className="shrink-cell" data-label="Name">
                          {t[0]}
                        </td>
                        <td data-label="Key">
                          <input
                            disabled
                            className="h-8 w-full mt-1"
                            type="text"
                            id={`value-${t[0]}`}
                            value={t[1]}
                          />
                        </td>
                        <td className="shrink-cell center-cell">
                          <Popover
                            isOpen={isActionMenuOpen === t[0]}
                            onClickOutside={(e) => {
                              if (e.currentTarget !== null) {
                                if (
                                  e.target instanceof Element &&
                                  e.target.getAttribute('data-key')
                                ) {
                                  const keyname =
                                    e.target.getAttribute('data-key')
                                  setIsActionMenuOpen(keyname || '')
                                } else {
                                  setIsActionMenuOpen('')
                                }
                              }
                            }}
                            positions={['bottom', 'left', 'top', 'right']} // preferred positions by priority
                            padding={2}
                            content={({ position, childRect, popoverRect }) => (
                              <ArrowContainer
                                position={position}
                                childRect={childRect}
                                popoverRect={popoverRect}
                                arrowColor={'black'}
                                arrowSize={6}
                                className="popover-arrow-container"
                                arrowClassName="popover-arrow"
                              >
                                <div className="actions-menu">
                                  <form
                                    data-value={t[1]}
                                    onSubmit={handleCopyToken}
                                  >
                                    <Button
                                      type="submit"
                                      id="copy-key"
                                      hologram={false}
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
                                      hologram={false}
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
                              </ArrowContainer>
                            )}
                          >
                            <button
                              onClick={() => setIsActionMenuOpen(t[0])}
                              className={`${
                                isActionMenuOpen === t[0]
                                  ? 'actions-trigger--active'
                                  : ''
                              } btn small actions-trigger`}
                              data-key={t[0]}
                            >
                              Actions
                            </button>
                          </Popover>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </When>
            <When condition={keys.length === 0}>
              <p className="text-center my-16">
                <span className="text-5xl inline-block mb-4">😢</span>
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
