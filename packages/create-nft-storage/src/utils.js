import fs from 'fs'
import kleur from 'kleur'
import path from 'path'
import { execSync } from 'child_process'
import rimraf from 'rimraf'
import got from 'got'
import tar from 'tar'
import { Stream } from 'stream'
import { promisify } from 'util'
import ora from 'ora'
import { execa } from 'execa'

const pipeline = promisify(Stream.pipeline)

/**
 * @param {fs.PathLike} directory
 */
export async function isWriteable(directory) {
  try {
    await fs.promises.access(directory, (fs.constants || fs).W_OK)
    return true
  } catch (err) {
    return false
  }
}

/**
 * @param {fs.PathLike} root
 */
export function makeDir(root, options = { recursive: true }) {
  return fs.promises.mkdir(root, options)
}

/**
 * @param {string} root
 * @param {string} name
 */
export function isFolderEmpty(root, name) {
  const validFiles = [
    '.DS_Store',
    '.git',
    '.gitattributes',
    '.gitignore',
    '.gitlab-ci.yml',
    '.hg',
    '.hgcheck',
    '.hgignore',
    '.idea',
    '.npmignore',
    '.travis.yml',
    'LICENSE',
    'Thumbs.db',
    'docs',
    'mkdocs.yml',
    'npm-debug.log',
    'yarn-debug.log',
    'yarn-error.log',
  ]

  const conflicts = fs
    .readdirSync(root)
    .filter((file) => !validFiles.includes(file))
    // Support IntelliJ IDEA-based editors
    .filter((file) => !/\.iml$/.test(file))

  if (conflicts.length > 0) {
    console.log(
      `The directory ${kleur.green(name)} contains files that could conflict:`
    )
    console.log()
    for (const file of conflicts) {
      try {
        const stats = fs.lstatSync(path.join(root, file))
        if (stats.isDirectory()) {
          console.log(`  ${kleur.blue(file)}/`)
        } else {
          console.log(`  ${file}`)
        }
      } catch {
        console.log(`  ${file}`)
      }
    }
    console.log()
    console.log(
      'Either try using a new directory name, or remove the files listed above.'
    )
    console.log()
    return false
  }

  return true
}

function isInGitRepository() {
  try {
    execSync('git rev-parse --is-inside-work-tree', { stdio: 'ignore' })
    return true
  } catch (_) {}
  return false
}

function isInMercurialRepository() {
  try {
    execSync('hg --cwd . root', { stdio: 'ignore' })
    return true
  } catch (_) {}
  return false
}

/**
 * @param {string} root
 */
export function tryGitInit(root) {
  let didInit = false
  try {
    execSync('git --version', { stdio: 'ignore' })
    if (isInGitRepository() || isInMercurialRepository()) {
      return false
    }

    execSync('git init', { stdio: 'ignore' })
    didInit = true

    execSync('git checkout -b main', { stdio: 'ignore' })

    execSync('git add -A', { stdio: 'ignore' })
    execSync('git commit -m "Initial commit from Create Next App"', {
      stdio: 'ignore',
    })
    return true
  } catch (e) {
    if (didInit) {
      try {
        rimraf.sync(path.join(root, '.git'))
      } catch (_) {}
    }
    return false
  }
}

/**
 * @param {URL} url
 * @param {{ branch: string; path: string; }} opts
 */
export function getRepoInfo(url, opts) {
  const [, username, repo, t, branch, ...folderPath] = url.pathname.split('/')

  if (opts.branch) {
    return { username, repo, branch: opts.branch, folderPath: opts.path }
  }

  if (username && repo && branch && t === 'tree') {
    return { username, repo, branch, folderPath: folderPath.join('/') }
  }
}

/**
 * @param {string} example
 */
export function isValidURL(example) {
  try {
    const url = new URL(example)
    if (url.origin === 'https://github.com') {
      return url
    }
  } catch (error) {}
}

/**
 *
 * @param {import('./types').RepoInfo} [info]
 */
export function hasRepo(info) {
  if (!info) {
    return Promise.resolve(false)
  }
  const { username, repo, branch, folderPath } = info
  const contentsUrl = `https://api.github.com/repos/${username}/${repo}/contents`
  const packagePath = `${folderPath ? `/${folderPath}` : ''}/package.json`

  return isUrlOk(contentsUrl + packagePath + `?ref=${branch}`)
}

/**
 * @param {string | import("url").URL} url
 */
export async function isUrlOk(url) {
  const res = await got.head(url).catch((e) => e)
  return res.statusCode === 200
}

/**
 * @param {import('./types').RepoInfo} repoInfo
 * @param {string} example
 * @param {string} root
 */
export async function clone(repoInfo, example, root) {
  const spinner = ora({
    text: `Downloading files from repo ${kleur.cyan(
      example
    )}. This might take a moment.`,
    spinner: {
      frames: ['   ', '>  ', '>> ', '>>>'],
    },
  }).start()

  try {
    await downloadAndExtractRepo(root, repoInfo)
    spinner.succeed()
  } catch (err) {
    spinner.fail()
    console.error(err)
  }
}

/**
 * @param {string} root - Where to extract
 * @param {import('./types').RepoInfo} repoInfo
 */
export function downloadAndExtractRepo(root, repoInfo) {
  const { username, repo, branch, folderPath } = repoInfo

  return pipeline(
    got.stream(
      `https://codeload.github.com/${username}/${repo}/tar.gz/${branch}`
    ),
    tar.extract(
      {
        cwd: root,
        strip: folderPath ? folderPath.split('/').length + 1 : 1,
      },
      [
        `${repo}-${branch.replace('/', '-')}${
          folderPath ? `/${folderPath}` : ''
        }`,
      ]
    )
  )
}

/**
 * @param {string} projectDir
 */
export async function installDeps(projectDir) {
  // Install deps
  const spinner = ora({
    text: 'Installing dependencies...',
    spinner: {
      frames: ['   ', '>  ', '>> ', '>>>'],
    },
  }).start()

  let proc
  try {
    proc = execa(`npm`, [`install`], {
      stdio: 'ignore',
      cwd: projectDir,
    })
    await proc
    spinner.succeed()
  } catch (err) {
    spinner.fail()
    // @ts-ignore
    console.error(err.message)
  }
}
