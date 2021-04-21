import { useUserContext } from '../lib/user.js'
import { getToken, API } from '../lib/api'
import { useRouter } from 'next/router'
import { NFTStorage } from 'nft.storage'
import { useQueryClient } from 'react-query'
import { useState, useEffect } from 'react'
import Box from '../components/box.js'
import Button from '../components/button.js'
import Layout from '../components/layout.js'

export default function NewFile() {
  const router = useRouter()
  const [user, setUser, isLoading] = useUserContext()
  const queryClient = useQueryClient()
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login')
    }
  }, [user, router, isLoading])

  async function handleUploadSubmit(e) {
    e.preventDefault()
    const file = e.target.file
    const client = new NFTStorage({
      token: await getToken(),
      endpoint: API,
    })
    setUploading(true)
    try {
      await client.storeBlob(file.files[0])
    } finally {
      queryClient.invalidateQueries('get-nfts')
      setUploading(false)
      router.push('/files')
    }
  }

  return (
    <Layout user={user} navBgColor="nsyellow" title="Upload File - NFT Storage">
      <main className="bg-nsyellow">
        <div className="mw9 center pv3 ph5 min-vh-100">
          <Box
            bgColor="nsgray"
            borderColor="nspink"
            wrapperClassName="center mv4 mw6"
          >
            <h1 className="chicagoflf f4 fw4">Upload File</h1>
            <form onSubmit={handleUploadSubmit}>
              <div className="mv3">
                <label htmlFor="name" className="dib mb2">
                  File:
                </label>
                <input
                  id="file"
                  name="file"
                  type="file"
                  className="db ba b--black w5 pa2"
                  required
                />
              </div>
              <div className="mv3">
                <Button className="bg-nslime" type="submit" disable={uploading}>
                  {uploading ? 'Uploading...' : 'Upload'}
                </Button>
              </div>
              <div>
                <p className="lh-copy f7">100MB upload limit per file.</p>
                <p className="lh-copy f7">
                  You can also upload files using the{' '}
                  <a href="/#js-client" className="black">
                    JS Client Library
                  </a>
                  ,{' '}
                  <a href="/#raw-http-request" className="black">
                    Raw HTTP Requests
                  </a>{' '}
                  or via the{' '}
                  <a
                    href="/#configure-as-a-remote-pinning-service"
                    className="black"
                  >
                    Remote Pinning Service API
                  </a>
                  .
                </p>
              </div>
            </form>
          </Box>
        </div>
      </main>
    </Layout>
  )
}
