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
  isWriteable,
  makeDir,
  tryGitInit,
} from './utils.js'
import kleur from 'kleur'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const cli = sade('create-nft-storage [example]', true)

cli
  .describe('Create a new NFT Storage app.')
  .action(async (example) => {
    console.log(
      ">>> Welcome to NFT Storage! Let's get you set up with a new codebase."
    )

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

    process.chdir(root)

    // Copy example to dir
    if (example) {
      let repoUrl

      try {
        repoUrl = new URL(example)
      } catch (error) {
        console.error(error)
        process.exit(1)
      }

      if (repoUrl) {
        if (repoUrl.origin !== 'https://github.com') {
          console.error(
            `Invalid URL: ${kleur.red(
              `"${example}"`
            )}. Only GitHub repositories are supported. Please use a GitHub URL and try again.`
          )
          process.exit(1)
        }

        const repoInfo = getRepoInfo(repoUrl)

        if (!repoInfo) {
          console.error(
            `Found invalid GitHub URL: ${kleur.red(
              `"${example}"`
            )}. Please fix the URL and try again.`
          )
          process.exit(1)
        }

        const found = await hasRepo(repoInfo)

        if (!found) {
          console.error(
            `Could not locate the repository for ${kleur.red(
              `"${example}"`
            )}. Please check that the repository exists and try again.`
          )
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
