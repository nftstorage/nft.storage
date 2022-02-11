export function TimeSliceCommandQueueForm(props) {
  const { onPurgeQueue, isBusy, info } = props

  const cta = isBusy ? 'Purging...' : 'Purge Queue'

  return (
    <div className="sqs-form grid">
      <h2>Time Slice Commands</h2>
      <h5>SQS Quque</h5>
      <p>
        The Time slice commnad queue is all the slices calculated from the
        inital range.
      </p>
      <SQSInfoReadout data={info} />
      <button className="btn interactive hologram" onClick={onPurgeQueue}>
        {cta}
      </button>
    </div>
  )
}

export function FetchedRecordQueueForm(props) {
  const { onPurgeQueue, isBusy, info } = props

  const cta = isBusy ? 'Purging...' : 'Purge Queue'

  return (
    <div className="sqs-form grid">
      <h2>Fetched Records</h2>
      <h5>SQS Queue</h5>
      <p>These are in flight records that precede the ingestion table</p>
      <SQSInfoReadout data={info} />
      <button className="btn interactive hologram" onClick={onPurgeQueue}>
        {cta}
      </button>
    </div>
  )
}

export function PreprocessorQueueForm(props) {
  const { onPurgeQueue, isBusy, info } = props

  const cta = isBusy ? 'Purging...' : 'Purge Queue'

  return (
    <div className="sqs-form grid">
      <h2>Preprocessor Records</h2>
      <h5>SQS Queue</h5>
      <p>
        Records pulled from ingestion table and the data warehouse prepped for
        ingestion
      </p>
      <SQSInfoReadout data={info} />
      <button className="btn interactive hologram" onClick={onPurgeQueue}>
        {cta}
      </button>
    </div>
  )
}

export function PostprocessorQueueForm(props) {
  const { onPurgeQueue, isBusy, info } = props

  const cta = isBusy ? 'Purging...' : 'Purge Queue'

  return (
    <div className="sqs-form grid">
      <h2>PostProcessed Records</h2>
      <h5>SQS Queue</h5>
      <p>
        Records that have fuly undergone processing, prepped for consumption
        into the PostProcessor Table
      </p>
      <SQSInfoReadout data={info} />
      <button className="btn interactive hologram" onClick={onPurgeQueue}>
        {cta}
      </button>
    </div>
  )
}

function SQSInfoReadout(props) {
  const { data } = props

  return (
    <div className="sqs-readout-panel grid">
      {data.map((d) => {
        return (
          <div key={d.id} className="sqs-readout grid ">
            <label className="label">{d.label}</label>
            <span className="value chicagoflf">{d.value || '-'}</span>
          </div>
        )
      })}
    </div>
  )
}
