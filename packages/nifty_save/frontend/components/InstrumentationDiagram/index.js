import { Canvas, Edge, Icon, Label, MarkerArrow, Node, Port } from 'reaflow'

import FlowDiagram from './FlowDiagram'
import { icons } from './icons'
import { sendTimeRangeToSlicer } from './actions'

export default function InstrumentationDiagram(props) {
  const { apiUrl } = props

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

  return (
    <div
      style={{
        backgroundColor: '#000',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      }}
    >
      <FlowDiagram
        onClickApi={async () => {
          console.log('clik')
          await sendTimeRangeToSlicer(apiUrl, {})
        }}
      />
    </div>
  )
}
