export function TimeSliceCommandQueueForm(props) {
  const { onPurgeQueue, isBusy } = props

  const cta = isBusy ? 'Purging...' : 'Purge Queue'

  return (
    <div className="grid">
      <h2>Time Slice Commands</h2>
      <h5>SQs Quque</h5>
      <button className="btn interactive hologram" onClick={onPurgeQueue}>
        {cta}
      </button>
    </div>
  )
}
