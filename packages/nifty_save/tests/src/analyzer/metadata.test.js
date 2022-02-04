import { cleanJSON, detectTokenURIFormat } from '../../../src/analyzer/metadata'
import {
  garbageTokenURI_1,
  httpsTokenURI_1,
  inlineJSONBase64_1,
  inlineJSONBase64_2,
  inlineJSONTokenURI_1,
  inlineJSONTokenURI_1_cleaned,
  inlineJSONTokenURI_2,
  inlineJSONTokenURI_2_cleaned,
  ipfsTokenURI_1,
} from '../../fixtures/tokenURIs'

test('Metadata - Can Detect Format', () => {
  expect(detectTokenURIFormat(httpsTokenURI_1)).toBe('HTTPS')
  expect(detectTokenURIFormat(ipfsTokenURI_1)).toBe('IPFS')
  expect(detectTokenURIFormat(inlineJSONBase64_1)).toBe('BASE64')
  expect(detectTokenURIFormat(inlineJSONBase64_2)).toBe('BASE64')
  expect(detectTokenURIFormat(inlineJSONTokenURI_1)).toBe('JSON')
  expect(detectTokenURIFormat(inlineJSONTokenURI_2)).toBe('JSON')
  expect(detectTokenURIFormat(garbageTokenURI_1)).toBe('UNKNOWN_FORMAT')
})

test('Metadata - Can Sanitize JSON', () => {
  expect(cleanJSON(inlineJSONTokenURI_1)).toEqual(inlineJSONTokenURI_1_cleaned)
  expect(cleanJSON(inlineJSONTokenURI_2)).toEqual(inlineJSONTokenURI_2_cleaned)
})
