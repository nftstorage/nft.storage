import { useState } from 'react'
import { useRouter } from 'next/router'
import { useQueryClient } from 'react-query'
import Box from '../components/box.js'
import Button from '../components/button.js'
import { createPinningRequest } from '../lib/api.js'
import countly from '../lib/countly.js'

/**
 * Static Props
 *
 * @returns {{ props: import('../components/types.js').LayoutProps}}
 */
export function getStaticProps() {
  return {
    props: {
      title: 'Request API Pinning Access - NFT Storage',
      navBgColor: 'bg-nsgreen',
      needsUser: true,
      redirectTo: '/manage',
    },
  }
}

export default function NewKey() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const [requesting, setRequesting] = useState(false)

  /**
   * @param {import('react').ChangeEvent<HTMLFormElement>} e
   */
  async function handleRequestPinningAccess(e) {
    e.preventDefault()
    const data = new FormData(e.target)

    const reason = data.get('reason')
    const examples = data.get('examples')
    const profile = data.get('profile')

    if (reason && examples && profile) {
      setRequesting(true)
      try {
        await createPinningRequest(reason, examples, profile)
      } finally {
        await queryClient.invalidateQueries('get-tokens')
        setRequesting(false)
        router.push({
          pathname: '/manage',
        })
      }
    }
  }

  return (
    <main className="bg-nsgreen grow">
      <div className="max-w-7xl mx-auto py-4 px-6 sm:px-16">
        <Box
          bgColor="nsgray"
          borderColor="nspink"
          wrapperClassName="center mv4 mw6"
        >
          <h1 className="chicagoflf text-xl font-normal">
            Request API Pinning Access
          </h1>
          <form onSubmit={handleRequestPinningAccess}>
            <div className="my-4">
              <label htmlFor="reason" className="inline-block mb-2">
                Why you are looking for pinning service API access (e.g.,
                you&apos;re an artist looking for extra redundancy):
              </label>
              <textarea
                id="reason"
                name="reason"
                className="block border border-solid border-black w-64 p-2"
                required
              />
            </div>
            <div className="my-4">
              <label htmlFor="examples" className="inline-block mb-2">
                Please provide a sample of 5-10 CIDs of NFTs / metadata you are
                looking to pin:
              </label>
              <textarea
                id="examples"
                name="examples"
                className="block border border-solid border-black w-64 p-2"
                required
              />
            </div>
            <div className="my-4">
              <label htmlFor="profile" className="inline-block mb-2">
                Please provide a profile on an NFT service (artist profile,
                collector, etc):
              </label>
              <textarea
                id="profile"
                name="profile"
                className="block border border-solid border-black w-64 p-2"
                required
              />
            </div>

            <div>
              <Button
                className="bg-nslime"
                type="submit"
                disabled={requesting}
                id="create-new-request"
                tracking={{
                  event: countly.events.PINNING_REQUEST,
                  ui: countly.ui.PINNING_REQUEST,
                }}
              >
                {requesting ? 'Requesting...' : 'Request'}
              </Button>
            </div>
          </form>
        </Box>
      </div>
    </main>
  )
}
