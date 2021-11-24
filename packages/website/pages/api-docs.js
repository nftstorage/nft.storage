// @ts-ignore
import SwaggerUI from 'swagger-ui-react'
import { getToken } from '../lib/api'

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
    <SwaggerUI
      url="/schema.yml"
      requestInterceptor={requestHandler}
      className="foo"
    />
  )
}
