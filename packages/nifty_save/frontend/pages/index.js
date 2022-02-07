import Head from 'next/head'

export async function getStaticProps() {
  console.log('url', process.env.NIFTYSAVE_API_URL)
  return {
    props: {
      NIFTYSAVE_API_URL: process.env.NIFTYSAVE_API_URL,
    },
  }
}

export default function Home(props) {
  const { NIFTYSAVE_API_URL } = props

  const sendTimeRangeToSlicer = async () => {
    await fetch(
      'https://v3ooz5obj9.execute-api.us-east-1.amazonaws.com/ingest/slice-queue/fill',
      {
        body: JSON.stringify({
          timesliceSize: 6000000,
          rangeStartTime: '2019-6-1',
          rangeEndTime: '2019-6-2',
          source: 'the-graph',
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      }
    )
  }

  return (
    <div>
      <Head>
        <title>Niftysave Tools</title>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/water.css@2/out/water.css"
        ></link>
        <meta name="description" content="Niftysave Tools" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <button onClick={sendTimeRangeToSlicer}>Send Timerange</button>
      </div>
    </div>
  )
}
