import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'node:url'
import { mergeTypeDefs } from '@graphql-tools/merge'
import { loadFilesSync } from '@graphql-tools/load-files'
import { print } from 'graphql'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const loadedFiles = loadFilesSync(`${__dirname}/../schema/**/*.gql`, {})

const defs = mergeTypeDefs(loadedFiles)
defs.definitions.pop()
const schemaPath = path.join(__dirname, '../fauna/schema.graphql')
fs.writeFileSync(schemaPath, print(defs))
