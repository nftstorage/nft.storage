import Editor from './Editor'
export function InjectProcessorRecordForm(props) {
  const { onInjectRecordToProcessor, isBusy, code = `{}` } = props

  const cta = isBusy ? 'Injecting...' : 'Inject Record'

  return (
    <div className="sqs-form grid">
      <h2>Record Injector</h2>
      <h5>Lambda To Event Bridge</h5>
      <p>Send a Record Directly to the Chain of Responsibility</p>
      <Editor code={JSON.stringify({ foo: 'nardfdf' }, null, 2)} />
      <button
        className="btn interactive hologram"
        onClick={onInjectRecordToProcessor}
      >
        {cta}
      </button>
    </div>
  )
}
