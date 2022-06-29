import { Registry } from 'prom-client'

declare module 'prom-client' {
  export interface Pushgateway {
    registry: Registry
  }
}
