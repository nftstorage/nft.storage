export const API =
  process.env.NEXT_PUBLIC_STATUS_PAGE_API || 'https://status.nft.storage/api/v2'

export async function getStatusPageSummary() {
  const route = '/summary.json'
  const res = await fetch(API + route)
  const body = await res.json()

  if (body) {
    return body
  } else {
    throw new Error(
      'An error occurred while trying to fetch data from the status page API.'
    )
  }
}
