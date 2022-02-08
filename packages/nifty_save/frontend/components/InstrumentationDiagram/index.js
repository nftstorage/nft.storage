import FlowDiagram from './FlowDiagram'
import { sendTimeRangeToSlicer } from './actions'

export default function InstrumentationDiagram(props) {
  const { apiUrl } = props

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
