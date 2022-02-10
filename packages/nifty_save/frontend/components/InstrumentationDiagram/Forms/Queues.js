export function TimeSliceCommandQueueForm(props) {
  const { onPurgeQueue, isBusy } = props

  const cta = isBusy ? 'Purging...' : 'Purge Queue'

  return (
    <div className="grid">
      <h2>Time Slice Commands</h2>
      <h5>SQS Quque</h5>
      <button className="btn interactive hologram" onClick={onPurgeQueue}>
        {cta}
      </button>
    </div>
  )
}

export function FetchedRecordQueueForm(props) {
  const { onPurgeQueue, isBusy } = props

  const cta = isBusy ? 'Purging...' : 'Purge Queue'

  return (
    <div className="grid">
      <h2>Fetched Records</h2>
      <h5>SQS Queue</h5>
      <p>These are in flight records that precede the ingestion table</p>
      <button className="btn interactive hologram" onClick={onPurgeQueue}>
        {cta}
      </button>
    </div>
  )
}

export function PreprocessorQueueForm(props) {
  const { onPurgeQueue, isBusy } = props

  const cta = isBusy ? 'Purging...' : 'Purge Queue'

  return (
    <div className="grid">
      <h2>Preprocessor Records</h2>
      <h5>SQS Queue</h5>
      <p>
        Records pulled from ingestion table and the data warehouse prepped for
        ingestion
      </p>
      <button className="btn interactive hologram" onClick={onPurgeQueue}>
        {cta}
      </button>
    </div>
  )
}

export function PostprocessorQueueForm(props) {
  const { onPurgeQueue, isBusy } = props

  const cta = isBusy ? 'Purging...' : 'Purge Queue'

  return (
    <div className="grid">
      <h2>PostProcessed Records</h2>
      <h5>SQS Queue</h5>
      <p>
        Records that have fuly undergone processing, prepped for consumption
        into the PostProcessor Table
      </p>
      <button className="btn interactive hologram" onClick={onPurgeQueue}>
        {cta}
      </button>
    </div>
  )
}
