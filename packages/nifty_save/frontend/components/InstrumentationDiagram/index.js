import {
  EditSliceCommandForm,
  FetchedRecordQueueForm,
  PostprocessorQueueForm,
  PreprocessorQueueForm,
  TimeSliceCommandQueueForm,
} from './Forms'
import {
  getHealthReport,
  purgeFetchedRecordsSQS,
  purgePostProcessorSQS,
  purgePreprocessorSQS,
  purgeTimeSliceSQS,
  sendTimeRangeToSlicer,
} from './actions'
import { useEffect, useState } from 'react'

import FlowDiagram from './FlowDiagram'
import Modal from '../Modal'

export default function InstrumentationDiagram(props) {
  const { apiUrl } = props

  /* Report | Health */
  const [healthReport, setHealthReport] = useState({})

  /* Api Gateway */
  const [apiGateWayFormIsOpen, setApiGatewayFormIsOpen] = useState(false)
  const [sendingSlice, setSendingSlice] = useState(false)
  const [apiGatewayReadout, setApiGatewayReadout] = useState({
    message: 'No Commands sent',
  })

  /* SQS Queues */

  /* TimeSliceCommandQueueForm*/
  const [timeSliceSQSIsOpen, setTimeSliceSQSIsOpen] = useState(false)
  const [purgingTimeSliceSQS, setPurgingTimeSliceSQS] = useState(false)

  /* FetchedRecordQueueForm*/
  const [fetchedRecordSQSIsOpen, setFetchedRecordSQSIsOpen] = useState(false)
  const [purgingFetchedRecordSQS, setPurgingFetchedRecordSQS] = useState(false)

  /* PreprocessorQueueForm*/
  const [preprocessorSQSIsOpen, setPreprocessorSQSIsOpen] = useState(false)
  const [purgingPreprocessorSQS, setPurgingPreprocessorSQS] = useState(false)

  /* PostprocessorQueueForm*/
  const [postprocessorSQSIsOpen, setPostprocessorSQSIsOpen] = useState(false)
  const [purgingPostProcessorSQS, setPurgingPostprocessorSQS] = useState(false)

  useEffect(() => {
    const updateHealth = async () => {
      console.log('run update health')
      const results = await getHealthReport(apiUrl)
      console.log('health report done.')
      console.log(results)
      setHealthReport(results)
    }
    updateHealth()
  }, [setHealthReport, apiUrl])

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
        onClickFetchedRecordSQS={() => {
          setFetchedRecordSQSIsOpen(true)
        }}
        onClickPreprocessorSQS={() => {
          setPreprocessorSQSIsOpen(true)
        }}
        onClickPostProcessorSQS={() => {
          setPostprocessorSQSIsOpen(true)
        }}
        onClickFetchedRecordsTable={() => {
          console.log('clicked fetched records table')
          alert('Fetched Records Table has 0 records')
        }}
        onClickPostprocessorTable={() => {
          console.log('clicked postprocessor table')
          alert('Postprocessed Records Table has 0 records')
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

      {/* SQS Queues */}
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

      <Modal
        open={fetchedRecordSQSIsOpen}
        onClose={() => {
          setFetchedRecordSQSIsOpen(false)
        }}
      >
        <FetchedRecordQueueForm
          isBusy={purgingFetchedRecordSQS}
          onPurgeQueue={async () => {
            /* TODO Purge Queue */
            setPurgingFetchedRecordSQS(true)
            const results = await purgeFetchedRecordsSQS(apiUrl, {})
            console.log(results)
            setFetchedRecordSQSIsOpen(false)
            setPurgingFetchedRecordSQS(false)
          }}
        />
      </Modal>

      <Modal
        open={preprocessorSQSIsOpen}
        onClose={() => {
          setPreprocessorSQSIsOpen(false)
        }}
      >
        <PreprocessorQueueForm
          isBusy={purgingPreprocessorSQS}
          onPurgeQueue={async () => {
            /* TODO Purge Queue */
            setPurgingPreprocessorSQS(true)
            const results = await purgePreprocessorSQS(apiUrl, {})
            console.log(results)
            setPreprocessorSQSIsOpen(false)
            setPurgingPreprocessorSQS(false)
          }}
        />
      </Modal>

      <Modal
        open={postprocessorSQSIsOpen}
        onClose={() => {
          setPostprocessorSQSIsOpen(false)
        }}
      >
        <PostprocessorQueueForm
          isBusy={purgingPostProcessorSQS}
          onPurgeQueue={async () => {
            /* TODO Purge Queue */
            setPurgingPostprocessorSQS(true)
            const results = await purgePostProcessorSQS(apiUrl, {})
            console.log(results)
            setPostprocessorSQSIsOpen(false)
            setPurgingPostprocessorSQS(false)
          }}
        />
      </Modal>
    </div>
  )
}
