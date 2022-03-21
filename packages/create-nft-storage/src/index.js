#!/usr/bin/env node

import sade from 'sade'
import path from 'path'
import fse from 'fs-extra'
import inquirer from 'inquirer'
import {
  clone,
  getRepoInfo,
  hasRepo,
  installDeps,
  isFolderEmpty,
  isValidURL,
  isWriteable,
  makeDir,
  tryGitInit,
} from './utils.js'
import kleur from 'kleur'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const cliName = 'create-nft-storage'
const cli = sade('create-nft-storage [example]', true)

cli
  .describe([
    'Create a new NFT Storage app.\n',
    'When your branch name includes a "/" use the --branch option instead of the full GitHub URL.',
  ])
  .example(
    `ucan-node ${kleur.dim(
      '# Create app based on "ucan-node" example in NFT.Storage repo.'
    )}`
  )
  .example(
    `ucan-node -b new-example ${kleur.dim(
      '# Create app based on "ucan-node" example in NFT.Storage repo in a different branch.'
    )}`
  )
  .example(
    `https://github.com/nftstorage/nft.storage/tree/main/examples/ucan-node ${kleur.dim(
      '# Create app based on full GitHub URL.'
    )}`
  )
  .example(
    `https://github.com/nftstorage/nft.storage --branch master --path examples/basic ${kleur.dim(
      '# Create app based on base GitHub repo URL with options for branch and example folder.'
    )}`
  )
  .option('-b, --branch', 'Branch name.')
  .option('-p, --path', 'Path to a directory in the example repo.')
  .action(async (example, opts) => {
    console.log(
      ">>> Welcome to NFT Storage! Let's get you set up with a new codebase.\n"
    )

    // Ask for a directory to clone example
    const projectDir = path.resolve(
      process.cwd(),
      (
        await inquirer.prompt([
          {
            type: 'input',
            name: 'dir',
            message: 'Where would you like to create your NFT Storage app?',
            default: './my-nft-storage',
          },
        ])
      ).dir
    )

    // Check if root folder is writeable
    const root = path.resolve(projectDir)

    if (!(await isWriteable(path.dirname(root)))) {
      console.error(
        'The application path is not writable, please check folder permissions and try again.'
      )
      console.error(
        'It is likely you do not have write permissions for this folder.'
      )
      process.exit(1)
    }

    // Create dir or check if is empty enough
    const appName = path.basename(root)

    await makeDir(root)
    if (!isFolderEmpty(root, appName)) {
      process.exit(1)
    }

    console.log(`Creating a new NFT Storage app in ${kleur.green(root)}.`)
    console.log()

    // CD into the root directory
    process.chdir(root)

    // Copy/Pull example to root
    if (example) {
      let repoUrl = isValidURL(example)

      if (repoUrl) {
        const repoInfo = getRepoInfo(repoUrl, opts)
        const found = await hasRepo(repoInfo)

        if (!repoInfo || !found) {
          console.error(
            `Could not locate the repository for ${kleur.red(
              `"${example}"`
            )}.\nPlease check ${kleur.blue(`${cliName} --help`)} and try again.`
          )
          if (repoInfo) {
            console.error(kleur.dim(JSON.stringify(repoInfo, undefined, 2)))
          }
          process.exit(1)
        }
        await clone(repoInfo, example, root)
      } else {
        // try our own repo examples
        const repoInfo = getRepoInfo(
          new URL('https://github.com/nftstorage/nft.storage'),
          {
            branch: opts.branch || 'main',
            path: `examples/${example}`,
          }
        )

        const found = await hasRepo(repoInfo)
        if (!repoInfo || !found) {
          console.error(
            `Could not locate the example ${kleur.red(
              `"${example}"`
            )}.\nPlease check ${kleur.blue(`${cliName} --help`)} and try again.`
          )
          if (repoInfo) {
            console.error(kleur.dim(JSON.stringify(repoInfo, undefined, 2)))
          }
          process.exit(1)
        }
        await clone(repoInfo, example, root)
      }
    } else {
      /**
       * Otherwise, if an example repository is not provided for cloning, proceed
       * by installing from a template.
       */

      const templateDir = path.join(__dirname, '..', 'templates', 'default')
      await fse.copy(templateDir, root)
    }

    // Install deps
    await installDeps(projectDir)

    const giti = tryGitInit(root)
    if (giti) {
      console.log(`${kleur.green('✔')} Initialized a git repository.`)
      console.log()
    }

    console.log(`${kleur.green('Success!')} Created ${appName} at ${root}`)
    console.log('We suggest that you begin by typing:')
    console.log()
    console.log(kleur.cyan('  cd'), appName)
    console.log(kleur.cyan('  cat'), 'README.md')
    console.log()
  })
  .parse(process.argv)
