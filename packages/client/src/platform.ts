import { MemoryBlockStore } from 'ipfs-car/blockstore/memory'

declare var fetchExport: typeof fetch
declare var FormDataExport: typeof FormData
interface FormDataExport extends FormData {}

declare var HeadersExport: typeof Headers
interface HeadersExport extends Headers {}

declare var RequestExport: typeof Request
interface RequestExport extends Request {}

declare var ResponseExport: typeof Response
interface ResponseExport extends Response {}

declare var BlobExport: typeof Blob
interface BlobExport extends Blob {}

declare var FileExport: typeof File
interface FileExport extends File {}
declare var ReadableStreamExport: typeof ReadableStream

export const Blockstore = MemoryBlockStore
export {
  fetchExport as fetch,
  FormDataExport as FormData,
  HeadersExport as Headers,
  RequestExport as Request,
  ResponseExport as Response,
  BlobExport as Blob,
  FileExport as File,
  ReadableStreamExport as ReadableStream,
}
