import { useState } from 'react'
import { useRouter } from 'next/router'
import { useQueryClient } from 'react-query'
import Box from '../components/box.js'
import Button from '../components/button.js'
import { createToken } from '../lib/api.js'
import countly from '../lib/countly.js'

/**
 * Static Props
 *
 * @returns {{ props: import('../components/types.js').LayoutProps}}
 */
export function getStaticProps() {
  return {
    props: {
      title: 'New API Key - NFT Storage',
      navBgColor: 'bg-nsgreen',
      needsUser: true,
      redirectTo: '/manage',
    },
  }
}

export default function NewKey() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const [creating, setCreating] = useState(false)

  /**
   * @param {import('react').ChangeEvent<HTMLFormElement>} e
   */
  async function handleCreateToken(e) {
    e.preventDefault()
    const data = new FormData(e.target)
    const name = data.get('name')
    if (name && typeof name === 'string') {
      setCreating(true)
      try {
        await createToken(name)
      } finally {
        await queryClient.invalidateQueries('get-tokens')
        setCreating(false)
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
          <h1 className="chicagoflf text-xl font-normal">New API Key</h1>
          <form onSubmit={handleCreateToken}>
            <div className="my-4">
              <label htmlFor="name" className="inline-block mb-2">
                Name
              </label>
              <input
                id="name"
                name="name"
                placeholder="Give this API key a name"
                className="block border border-solid border-black w-64 p-2"
                required
              />
            </div>
            <div>
              <Button
                className="bg-nslime"
                type="submit"
                disabled={creating}
                id="create-new-key"
                tracking={{
                  event: countly.events.TOKEN_CREATE,
                  ui: countly.ui.NEW_TOKEN,
                }}
              >
                {creating ? 'Creating...' : 'Create'}
              </Button>
            </div>
          </form>
        </Box>
      </div>
    </main>
  )
}
