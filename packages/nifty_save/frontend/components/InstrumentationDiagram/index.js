import Modal, { dialogModes } from '../Modal'

import FlowDiagram from './FlowDiagram'
import { sendTimeRangeToSlicer } from './actions'
import { useState } from 'react'

export default function InstrumentationDiagram(props) {
  const { apiUrl } = props
  const [apiGateWayFormIsOpen, setApiGatewayFormIsOpen] = useState(false)
  const [sendingSlice, setSendingSlice] = useState(false)

  return (
    <div className="niftysave-diagram">
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
            await sendTimeRangeToSlicer(apiUrl, {})
            setSendingSlice(false)
            setApiGatewayFormIsOpen(false)
          }}
        />
      </Modal>
      <FlowDiagram
        onClickApi={() => {
          setApiGatewayFormIsOpen(true)
        }}
      />
    </div>
  )
}

function EditSliceCommandForm(props) {
  const { onSubmit, isBusy } = props
  const [data, setData] = useState({})

  const cta = isBusy ? 'Sending...' : 'Send Slice'

  return (
    <div className="grid">
      <span>
        <h3>Api Gateway</h3>
        <h5>Send Time Range to Time Slicer</h5>
        <p>
          Send a larger slice of time to the Slice Command Queue with a targeted
          data source to be partitioned into smaller slices
        </p>
      </span>
      <div className="grid">
        <span className="input">
          <label>Source</label>
          <select name="test" aria-invalid="false">
            <option value="the-graph">The Graph [Eth]</option>
            <option value="nftport-polygon">NFTPort [PolyGon]</option>
            <option value="source-3">Another Source</option>
          </select>
        </span>
        <span className="input">
          <label>Range Start</label>
          <input></input>
        </span>
        <span className="input">
          <label>Range Start</label>
          <input></input>
        </span>
      </div>

      <button
        className="btn hologram interactive"
        enabled={isBusy}
        onClick={() => {
          onSubmit(data)
        }}
      >
        {cta}
      </button>
    </div>
  )
}
