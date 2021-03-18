import SwaggerUI from "swagger-ui-react"
import "swagger-ui-react/swagger-ui.css"

export default function docs ()  {
    return <SwaggerUI url="/schema.yml" />
}