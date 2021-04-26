import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { redirectMagic, redirectSocial } from '../lib/magic.js'

export function getStaticProps() {
  return {
    props: {
      title: 'NFT Storage',
      callback: true,
      redirectTo: '/files',
    },
  }
}

const Callback = () => {
  const router = useRouter()
  useEffect(() => {
    const finishSocialLogin = async () => {
      try {
        await redirectSocial()
        router.push('/files')
      } catch (error) {
        router.push('/')
      }
    }

    const finishEmailRedirectLogin = async () => {
      const magicCredential = router.query.magic_credential
      if (magicCredential) {
        try {
          await redirectMagic()
          router.push('/files')
        } catch (error) {
          router.push('/')
        }
      }
    }
    const provider = router.query.provider
    provider ? finishSocialLogin() : finishEmailRedirectLogin()
  }, [router, router.query])

  // TODO handle errors
  return null
}

export default Callback
