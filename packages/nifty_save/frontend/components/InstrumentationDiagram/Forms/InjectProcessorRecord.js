import React, { useEffect, useState } from 'react'

import Editor from './Editor'

export function InjectProcessorRecordForm(props) {
  const {
    onInjectRecordToProcessor,
    onChangeInjectRecordCode,
    isBusy,
    code = `{}`,
  } = props
  const [_code, setCode] = useState(props.code)

  const cta = isBusy ? 'Injecting...' : 'Inject Record'

  useEffect(() => {
    setCode(props.code)
  }, [props.code])

  return (
    <div className="sqs-form grid">
      <h2>Record Injector</h2>
      <h5>Lambda To Event Bridge</h5>
      <p>Send a Record Directly to the Chain of Responsibility</p>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gridGap: '1rem',
        }}
      >
        <div />
        <button
          className="btn interactive hologram"
          onClick={() => {
            setCode('')
            onChangeInjectRecordCode('')
          }}
        >
          `clear`
        </button>
      </div>

      <Editor code={_code} onChangeCode={onChangeInjectRecordCode} />
      <button
        className="btn interactive hologram"
        onClick={onInjectRecordToProcessor}
      >
        {cta}
      </button>
    </div>
  )
}
