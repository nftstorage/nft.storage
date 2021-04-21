import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { redirectMagic, redirectSocial } from '../lib/magic.js'
import { useUserContext } from '../lib/user'
import Loading from '../components/loading'

const Callback = () => {
  const router = useRouter()
  const [user, setUser] = useUserContext()
  useEffect(() => {
    let provider = router.query.provider
    provider ? finishSocialLogin() : finishEmailRedirectLogin()
  }, [router.query])

  const finishSocialLogin = async () => {
    let data = await redirectSocial()
    await setUser(data)
    router.push('/manage')
  }

  const finishEmailRedirectLogin = async () => {
    let magicCredential = router.query['magic_credential']
    if (magicCredential) {
      const data = await redirectMagic()
      await setUser(data)
      router.push('/manage')
    }
  }

  // TODO handle errors
  return <Loading />
}

export default Callback
