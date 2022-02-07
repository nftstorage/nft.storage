import { Canvas, Edge, Icon, Label, MarkerArrow, Node, Port } from 'reaflow'

import ApiGatewayIcon from 'react-aws-icons/dist/aws/logo/APIGateway'
import Head from 'next/head'
import SQSIcon from 'react-aws-icons/dist/aws/logo/SQS'
import { icons } from '../components/icons'
import styles from '../styles/Home.module.css'

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

  const iconWH = { height: 30, width: 30 }

  const nodes = [
    {
      id: 'api',
      text: 'Niftysave Api Gateway',
      icon: {
        url: icons.gateway,
        ...iconWH,
      },
    },
    {
      id: 'time-slicer',
      text: 'Time Slicer',
      icon: {
        url: icons.lambda,
        ...iconWH,
      },
    },
    {
      id: '3',
      text: 'Thing',
      icon: {
        url: icons.lambda,
        ...iconWH,
      },
    },
  ]
  const edges = [
    {
      id: 'api-to-timeslicer',
      from: 'api',
      to: 'time-slicer',
    },
  ]

  const canvas = typeof window !== 'undefined' && (
    <Canvas
      nodes={nodes}
      edges={edges}
      node={
        <Node
          icon={<Icon />}
          style={{ stroke: '#1a192b', fill: 'white', strokeWidth: 1 }}
          label={<Label style={{ fill: 'black' }} />}
          port={
            <Port style={{ fill: 'blue', stroke: 'white' }} rx={10} ry={10} />
          }
        />
      }
    />
  )

  const diagram = (
    <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
      {canvas}
    </div>
  )

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
