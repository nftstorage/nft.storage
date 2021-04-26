import SwaggerUI from 'swagger-ui-react'
import 'swagger-ui-react/swagger-ui.css'
import { getToken } from '../lib/api'
/**
 *
 * @param {Request} req
 */
const requestHandler = async (req) => {
  let token
  try {
    token = await getToken()
    req.headers.Authorization = 'Bearer ' + token
  } catch (error) {}
  return req
}

export function getStaticProps() {
  return {
    props: {
      title: 'HTTP API Docs - NFT Storage',
    },
  }
}

export default function docs() {
  return <SwaggerUI url="/schema.yml" requestInterceptor={requestHandler} />
}
