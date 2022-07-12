addEventListener('fetch', (event) => {
  console.log('got fetch event in test worker:', event)
  event.respondWith(
    new Response(
      `hi from test worker!\n here's some config globals: ${DATABASE_URL}, ${CLUSTER_API_URL}`
    )
  )
})
