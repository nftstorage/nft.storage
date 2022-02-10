export function TimeSliceCommandQueueForm(props) {
  const { onPurgeQueue } = props
  return (
    <div className="grid">
      <h2>Time Slice Commands</h2>
      <h5>SQs Quque</h5>
      <button onClikc={onPurgeQueue}>Purge Queue</button>
    </div>
  )
}
