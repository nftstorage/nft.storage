import Modal, { dialogModes } from '../Modal'

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
      <Modal startOpen={true}>
        <EditSliceCommandForm
          onSubmit={async () => {
            await sendTimeRangeToSlicer(apiUrl, {})
          }}
        />
      </Modal>
      <FlowDiagram onClickApi={() => {}} />
    </div>
  )
}

function EditSliceCommandForm(props) {
  const { onSubmit } = props
  return (
    <div>
      <p>asdasdasdasd</p>
      <button className="btn hologram interactive" onClick={() => onSubmit()}>
        Send Slice
      </button>
    </div>
  )
}
