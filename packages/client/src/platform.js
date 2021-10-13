import fetch, { Request, Response, Headers } from '@web-std/fetch'
import { FormData } from '@web-std/form-data'
import { ReadableStream } from '@web-std/blob'
import { File, Blob } from '@web-std/file'
import { FsBlockStore as Blockstore } from 'ipfs-car/blockstore/fs'

export {
  fetch,
  Request,
  Response,
  Headers,
  Blob,
  FormData,
  File,
  ReadableStream,
  Blockstore,
}
