import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useUserContext } from '../lib/user.js'
import { useQueryClient } from 'react-query'
import Box from '../components/box.js'
import Button from '../components/button.js'
import Layout from '../components/layout.js'
import { createToken } from '../lib/api.js'

export default function NewKey() {
  const router = useRouter()
  const [user, setUser, isLoading] = useUserContext()
  const queryClient = useQueryClient()
  const [creating, setCreating] = useState(false)

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login')
    }
  }, [user, router, isLoading])

  async function handleCreateToken(e) {
    e.preventDefault()
    const name = e.target.name.value
    setCreating(true)
    try {
      await createToken(name)
    } finally {
      queryClient.invalidateQueries('get-tokens')
      setCreating(false)
      router.push('/manage')
    }
  }

  return (
    <Layout user={user} navBgColor="nsgreen" title="New API key - NFT storage">
      <main className="bg-nsgreen">
        <div className="mw9 center pv3 ph5 min-vh-100">
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
                <Button className="bg-nslime" type="submit" disable={creating}>
                  {creating ? 'Creating...' : 'Create'}
                </Button>
              </div>
            </form>
          </Box>
        </div>
      </main>
    </Layout>
  )
}
