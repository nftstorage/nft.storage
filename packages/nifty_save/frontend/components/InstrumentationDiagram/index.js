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
import Loader from './loader'
import Modal from '../Modal'
import { isCallChain } from 'typescript'
import { useLongPoll } from './longpoll'

export default function InstrumentationDiagram(props) {
  const { apiUrl } = props

  /* Report | Health */
  const [healthReport, setHealthReport] = useState({})
  const [checkingHealth, setCheckingHealth] = useState(false)
  const [metrics, setMetrics] = useState({
    SliceCommandQueue: [],
    FetchedRecordQueue: [],
    PreProcesserQueue: [],
    PostProcesserQueue: [],
  })

  /* Api Gateway */
  const [apiGateWayFormIsOpen, setApiGatewayFormIsOpen] = useState(false)
  const [sendingSlice, setSendingSlice] = useState(false)
  const [apiGatewayReadout, setApiGatewayReadout] = useState('No Commands sent')

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
    const data = healthReport?.data || []
    console.log(healthReport)
    const _newMetrics = {
      SliceCommandQueue: getMetricsForComponent(
        'Queue',
        'SliceCommandQueue',
        data
      ),
      FetchedRecordQueue: getMetricsForComponent(
        'Queue',
        'FetchedRecordQueue',
        data
      ),
      PreProcesserQueue: getMetricsForComponent(
        'Queue',
        'PreProcesserQueue',
        data
      ),
      PostProcesserQueue: getMetricsForComponent(
        'Queue',
        'PostProcesserQueue',
        data
      ),
    }

    setMetrics(_newMetrics)
    console.log(_newMetrics)
  }, [healthReport, apiGatewayReadout, sendingSlice])

  useLongPoll(() => {
    const updateHealth = async () => {
      setCheckingHealth(true)
      const results = await getHealthReport(apiUrl)
      setHealthReport(results)
      setCheckingHealth(false)
    }

    if (!checkingHealth) {
      updateHealth()
    }
  }, 2 * 1000)

  return (
    <div className="niftysave-diagram">
      <div
        style={{
          position: 'absolute',
          display: checkingHealth ? 'block' : 'none',
        }}
      >
        <Loader />
      </div>
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
            console.log(results)
            setApiGatewayReadout(results?.message)
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
          info={metrics.SliceCommandQueue}
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
          info={metrics.FetchedRecordQueue}
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
          info={metrics.PreProcesserQueue}
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
          info={metrics.PostProcesserQueue}
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

/**
 *
 * @param {string} type
 * @param {string} name
 * @param {any[]} metrics
 * @returns any[]
 */
function getMetricsForComponent(type = '', name = '', metrics = []) {
  let componentMetrics = []

  componentMetrics =
    metrics.find((x) => x.type === type)?.metrics?.MetricDataResults || []

  componentMetrics = componentMetrics.filter(
    (mdr) => mdr?.Label?.indexOf(name) > -1
  )

  //console.log(componentMetrics)

  componentMetrics = componentMetrics.map((mdr) => {
    const label = mdr?.Label?.split(' ')[1] || ''
    const { Timestamps, Values, Messages } = mdr
    const values = Timestamps?.reduce((acc, timestamp, index) => {
      let _acc = [...acc]
      let val = Values[index]
      //   console.log(index, timestamp, val)
      _acc.push({
        date: timestamp,
        value: val,
      })
      return _acc
    }, [])

    const value =
      values.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      )[0]?.value || null

    const metric = {
      label: label.split(/(?=[A-Z])/)?.join(' '),
      id: label,
      values,
      value,
      messages: Messages,
    }
    return metric
  })
  return componentMetrics
}
