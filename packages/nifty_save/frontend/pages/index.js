import Head from 'next/head'
import InstrumentationDiagram from '../components/InstrumentationDiagram'
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

  return (
    <div>
      <Head>
        <title>Niftysave Tools</title>
        <meta name="description" content="Niftysave Tools" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <InstrumentationDiagram apiUrl={NIFTYSAVE_API_URL} />
    </div>
  )
}
