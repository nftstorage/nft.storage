export async function ingestHealth() {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Ingest is healthy' }),
  }
}
