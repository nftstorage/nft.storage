import { test, expect, Page, TestInfo } from '@playwright/test'
import * as fs from 'fs'
import { extname } from 'path'

test.beforeEach(async ({ page }) => {
  await page.goto('/')
})

test.describe('nft.storage homepage', () => {
  test('should be screenshottable', async ({ page }, testInfo) => {
    await page.screenshot({
      fullPage: true,
      path: await E2EScreenshotPath(testInfo, `homepage`),
    })
  })
  test('should explain the product', async ({ page }) => {
    const nftStorage = await page.locator('.nft-storage')
    expect(await nftStorage.innerText()).toMatch(/Free Storage for NFTs/gi)
  })
  test.skip('should have title', async ({ page }) => {
    expect(page).toHaveTitle(/^NFT\.Storage/i)
  })
})

/**
 * Given a screenshot name, return an absolute path to a good place to store it.
 * The resulting path will be to a '.png' file unless 'name' already has an extname.
 * @param testInfo - @playwright/test TestInfo
 * @param name - logical name of screenshot
 * @returns absolute path to a good place to store a screenshot
 */
async function E2EScreenshotPath(
  testInfo: Pick<TestInfo, 'outputPath'>,
  name: string
) {
  if (!extname(name)) {
    name = `${name}.png`
  }
  const path = testInfo.outputPath(name)
  return path
}
