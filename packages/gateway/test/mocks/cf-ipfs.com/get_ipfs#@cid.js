/**
 * https://github.com/sinedied/smoke#javascript-mocks
 */
module.exports = async ({ params }) => {
  const cid = params.cid

  if (cid === 'bafkreidyeivj7adnnac6ljvzj2e3rd5xdw3revw4da7mx2ckrstapoupoq') {
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Hello nft.storage! 😎',
    }
  } else if (
    cid === 'bafkreibxkbyybantsznyvlq2bhf24u4gew7pj6erjgduqp4mvqv54qjng4'
  ) {
    // Delays 300ms
    await new Promise((resolve) => setTimeout(resolve, 500))
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Hello nft.storage! 😎👻',
    }
  }

  return {
    statusCode: 524,
    headers: { 'Content-Type': 'text/plain' },
    body: {
      error: 'A timeout occurred',
    },
  }
}
