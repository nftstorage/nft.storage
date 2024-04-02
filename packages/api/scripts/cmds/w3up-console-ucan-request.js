import { input, confirm } from '@inquirer/prompts'
import { DID } from '@ucanto/core/schema'
import * as Space from '@web3-storage/access/space'
import * as fsp from 'node:fs/promises'
import { CarWriter } from '@ipld/car/writer'

export async function requestW3upConsoleUcan() {
  console.log('requestW3upConsoleUcan')

  /*
  We're going to get everything we need to build a UCAN
  that authorizes a session (e.g. a console.web3.storage agent) to
  do w3up stuff in some space.
  */

  // subject of the authorization,
  // e.g. a DID of a console.web3.storage session
  /** @type {`did:${string}:${string}` | undefined} */
  let subjectId
  {
    // if env var W3UP_UCAN_SUBJECT is set,
    // parse as DID and use as subjectId
    let subjectIdFromEnv
    if ((subjectIdFromEnv = process.env.W3UP_UCAN_SUBJECT)) {
      const did = DID.read(subjectIdFromEnv).ok
      if (!did)
        throw new Error(
          `failed to parse W3UP_UCAN_SUBJECT env var as DID: ${subjectIdFromEnv}`
        )
      if (
        await confirm({
          message: `use W3UP_UCAN_SUBJECT env var value as authorization subject? ${did}`,
        })
      ) {
        subjectId = did
      } else {
        console.warn('will not use value of W3UP_UCAN_SUBJECT env var')
      }
    } else {
      const subjectIdFromPrompt = await input({
        message:
          'ID of subject that should be authorized. e.g. you can copy the DID of your console session from https://console.web3.storage/space/import',
      })
      const subjectIdDid = DID.read(subjectIdFromPrompt).ok
      if (subjectIdDid) {
        subjectId = subjectIdDid
      } else {
        throw new Error(`Failed to parse as DID: ${subjectIdFromPrompt}`)
      }
    }
  }
  // now we should have a subjectId
  const subjectPrincipal = {
    did() {
      if (!subjectId) throw new Error(`failed to determine subject of ucan`)
      return subjectId
    },
  }

  /**
   * Issuer of the authorization.
   * e.g. ultimately the issuer must have authority rooted in the space itself,
   * so this issuer may be the space ID.
   * @type {Space.OwnedSpace | undefined}
   */
  let space

  // if W3UP_SPACE_RECOVERY is set and user confirms, build issuer of UCANs from it
  let spaceRecoveryMnemonic
  if (process.env.W3UP_SPACE_RECOVERY) {
    if (
      await confirm({
        message: `issue ucan using space from env var W3UP_SPACE_RECOVERY?`,
      })
    ) {
      spaceRecoveryMnemonic = process.env.W3UP_SPACE_RECOVERY
    } else {
      console.warn(`will not use env var W3UP_SPACE_RECOVERY`)
    }
  }
  // if no spaceRecoveryKey from env var, prompt for a recovery key
  if (!spaceRecoveryMnemonic) {
    spaceRecoveryMnemonic = await input({
      message: 'space recovery key mnemonic',
    })
  }

  /**
   * name that should appear for this space in console.web3.storage.
   * @type {string}
   */
  let nameForSpaceInConsole = await input({
    message: `What name do you want to appear in console.web3.storage when this space is imported? (e.g. 'staging.nft.storage NFTs')`,
    default: `nftstorage-${Date.now()}`,
  })

  space = await Space.fromMnemonic(spaceRecoveryMnemonic, {
    name: nameForSpaceInConsole,
  })

  // We now have a space object
  if (!space)
    throw new Error(`unable to build a space object from inputs: ${space}`)
  console.warn('space', space.did())

  // now let's have the space sign a UCAN that authorizes the subject
  // to access the space
  const authorizationForSubjectToAccessSpace = await space.createAuthorization(
    subjectPrincipal
  )

  const exportedUcan = await toCarBlob(authorizationForSubjectToAccessSpace)

  // we want to save to a file
  const outputPath = `/tmp/nftstorage-w3up-${Date.now()}.ucan.car`
  if (await confirm({ message: `output ucan car to file ${outputPath}?` })) {
    await fsp.writeFile(outputPath, exportedUcan.stream())
    console.warn(`wrote`, outputPath)
    console.warn(
      `When this delegation is imported into console.web3.storage, the space will be shown with the name "${nameForSpaceInConsole}"`
    )
  } else {
    console.warn(`did not output ucan to file because no confirmation`)
  }
}

/**
 * given a UCAN delegation, return a Blob of the serialized delegation.
 * It's serialized to a CAR file in a way where console.web3.storage import will accept it
 * when imported via https://github.com/web3-storage/console/blob/main/src/share.tsx#L138
 * @param {import('@ucanto/interface').Delegation} delegation
 * @returns {Promise<Blob>}
 */
export async function toCarBlob(delegation) {
  const { writer, out } = CarWriter.create()
  for (const block of delegation.export()) {
    // @ts-expect-error slight Block type mismatch
    void writer.put(block)
  }
  void writer.close()

  const carParts = []
  for await (const chunk of out) {
    carParts.push(chunk)
  }
  const car = new Blob(carParts, {
    type: 'application/vnd.ipld.car',
  })
  return car
}
