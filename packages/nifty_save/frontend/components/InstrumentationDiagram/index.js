import { EditSliceCommandForm, TimeSliceCommandQueueForm } from './Forms'
import { purgeTimeSliceSQS, sendTimeRangeToSlicer } from './actions'

import FlowDiagram from './FlowDiagram'
import Modal from '../Modal'
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
  const [timeSliceSQSIsOpen, setTimeSliceSQSIsOpen] = useState(false)
  const [purgingTimeSliceSQS, setPurgingTimeSliceSQS] = useState(false)

  return (
    <div className="niftysave-diagram">
      <FlowDiagram
        apiGatewayReadout={apiGatewayReadout}
        onClickApi={() => {
          setApiGatewayFormIsOpen(true)
        }}
        onClickTimeSliceSQS={() => {
          setTimeSliceSQSIsOpen(true)
        }}
      />

      {/* Forms */}
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
      <Modal
        open={timeSliceSQSIsOpen}
        onClose={() => {
          setTimeSliceSQSIsOpen(false)
        }}
      >
        <TimeSliceCommandQueueForm
          isBusy={purgingTimeSliceSQS}
          onPurgeQueue={async () => {
            /* TODO Purge Queue */
            setPurgingTimeSliceSQS(true)
            const results = await purgeTimeSliceSQS(apiUrl, {})
            console.log(results)
            setTimeSliceSQSIsOpen(false)
            setPurgingTimeSliceSQS(false)
          }}
        />
      </Modal>
    </div>
  )
}
