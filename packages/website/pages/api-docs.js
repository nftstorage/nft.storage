// @ts-ignore
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
    <>
      <h1 className="chicagoflf black mv4 flex-auto ph3 ph5-ns">API DOCS</h1>
      <SwaggerUI url="/schema.yml" requestInterceptor={requestHandler} />
    </>
  )
}
