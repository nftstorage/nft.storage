/**
 * @param {{ params: Record<string, string> }} request
 */
module.exports = async ({ params }) => ({
  statusCode: 200,
  headers: { 'Content-Type': 'application/json' },
  body: {
    cid: { '/': params.cid },
    peer_map: {
      FAKEPEERID: {
        peerName: 'Cluster Node 0',
        status: 'pinned',
        timestamp: new Date().toISOString(),
      },
    },
  },
})
