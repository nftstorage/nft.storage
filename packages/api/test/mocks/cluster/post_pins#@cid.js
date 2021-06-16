/**
 * https://github.com/sinedied/smoke#javascript-mocks
 * @typedef {{ buffer: Buffer, originalname: string }} MultrFile
 * @param {{ params: Record<string, string> }} request
 */
module.exports = async ({ params }) => {
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      cid: params.cid,
    }),
  }
}
