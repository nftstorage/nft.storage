import { EditSliceCommandForm, TimeSliceCommandQueueForm } from './Forms'

import FlowDiagram from './FlowDiagram'
import Modal from '../Modal'
import { sendTimeRangeToSlicer } from './actions'
import { useState } from 'react'

export default function InstrumentationDiagram(props) {
  const { apiUrl } = props

  /* Api Gateway */
  const [apiGateWayFormIsOpen, setApiGatewayFormIsOpen] = useState(false)
  const [sendingSlice, setSendingSlice] = useState(false)
  const [apiGatewayReadout, setApiGatewayReadout] = useState({
    message: 'No Commands sent',
  })

  /* Time Slice Command Queue */
  const [timeSliceSQSIsOpen, setTimeSliceSQS] = useState(false)

  return (
    <div className="niftysave-diagram">
      <FlowDiagram
        apiGatewayReadout={apiGatewayReadout}
        onClickApi={() => {
          setApiGatewayFormIsOpen(true)
        }}
      />

      <Modal
        open={apiGateWayFormIsOpen}
        onClose={() => {
          setApiGatewayFormIsOpen(false)
        }}
      >
        <EditSliceCommandForm
          isBusy={sendingSlice}
          onSubmit={async (data) => {
            setSendingSlice(true)
            const results = await sendTimeRangeToSlicer(apiUrl, data)
            setApiGatewayReadout(results)
            setSendingSlice(false)
            setApiGatewayFormIsOpen(false)
          }}
        />
      </Modal>
      <Modal>
        <TimeSliceCommandQueueForm
          open={timeSliceSQSIsOpen}
          onClose={() => {
            setTimeSliceSQS(false)
          }}
        />
      </Modal>
    </div>
  )
}
