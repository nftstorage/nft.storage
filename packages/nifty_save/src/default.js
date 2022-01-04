export async function defaultResponse() {
  return {
    statusCode: 200,
    body: JSON.stringify({ app: 'Niftysave', routes: [] }),
  }
}
