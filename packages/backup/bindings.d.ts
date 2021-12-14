import { CID } from 'multiformats'

/**
 * Information about a user upload.
 */
export interface BackupCandidate {
  uploadId: string
  sourceCid: CID
  userId: string
  origin: 'nft.storage' | 'web3.storage'
}

/**
 * Information about a user upload paired with it's content.
 */
export interface BackupContent extends BackupCandidate {
  content: AsyncIterable<Uint8Array>
}

/**
 * Information about a user upload paired with local file path.
 */
export interface LocalBackup extends BackupCandidate {
  filePath: string
}

/**
 * Information about a user upload paired with a URL it has been backed up to.
 */
export interface RemoteBackup extends BackupCandidate {
  backupUrl: URL
}
