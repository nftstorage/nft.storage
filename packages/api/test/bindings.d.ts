import { ProviderInput } from '@ucanto/server'
import { InferInvokedCapability } from '@ucanto/client'
import { Store, Upload, Filecoin } from '@web3-storage/capabilities'
import { FilecoinInfoSuccess } from '@web3-storage/capabilities/types'
import { Server as HttpServer } from 'http'

interface MockW3upOptions {
  did?: string
  onHandleFilecoinInfo?: (
    invocation: ProviderInput<InferInvokedCapability<typeof Filecoin.info>>
  ) => Promise<FilecoinInfoSuccess | undefined>
  onHandleUploadGet?: (
    invocation: ProviderInput<InferInvokedCapability<typeof Upload.get>>
  ) => Promise<UploadGetSuccess | undefined>
  onHandleStoreAdd?: (
    invocation: ProviderInput<InferInvokedCapability<typeof Store.add>>
  ) => Promise<void>
  onHandleUploadAdd?: (
    invocation: ProviderInput<InferInvokedCapability<typeof Upload.add>>
  ) => Promise<void>
}

interface MockW3up {
  server: HttpServer
  did: string
}
