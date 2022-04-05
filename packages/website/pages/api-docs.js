// @ts-ignore
import dynamic from 'next/dynamic'

import { getToken } from '../lib/api'

const DynamicSwaggerUI = dynamic(import('swagger-ui-react'), { ssr: false })

/**
 *
 * @param {Request} req
 */
const requestHandler = async (req) => {
  let token
  try {
    token = await getToken()
    // @ts-ignore
    req.headers.Authorization = 'Bearer ' + token
  } catch (error) {}
  return req
}

export function getStaticProps() {
  return {
    props: {
      title: 'HTTP API Docs - NFT Storage',
      description: 'NFT.Storage API docs',
    },
  }
}

export default function docs() {
  return (
    <DynamicSwaggerUI
      url="/schema.yml"
      // @ts-ignore
      requestInterceptor={requestHandler}
      className="foo"
    />
  )
}
