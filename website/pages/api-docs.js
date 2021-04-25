import SwaggerUI from 'swagger-ui-react'
import 'swagger-ui-react/swagger-ui.css'
import { getToken } from '../lib/api'
/**
 *
 * @param {Request} req
 */
const requestHandler = async (req) => {
  req.headers.Authorization = 'Bearer ' + (await getToken())
  return req
}

export default function docs() {
  return <SwaggerUI url="/schema.yml" requestInterceptor={requestHandler} />
}
