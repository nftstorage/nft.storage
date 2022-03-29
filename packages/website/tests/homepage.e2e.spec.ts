import { test, expect, Page } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/')
})

test.describe('nft.storage homepage', () => {
  test('should not have unexpected visual changes', async ({ page }) => {
    expect(await page.screenshot()).toMatchSnapshot()
  })
  test('should explain the product', async ({ page }) => {
    const nftStorage = await page.locator('.nft-storage')
    expect(await nftStorage.innerText()).toMatch(/Free Storage for NFTs/gi)
  })
  test.skip('should have title', async ({ page }) => {
    expect(page).toHaveTitle(/^NFT\.Storage/i)
  })
})
