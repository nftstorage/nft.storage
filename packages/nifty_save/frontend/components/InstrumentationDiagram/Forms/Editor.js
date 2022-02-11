import '@uiw/react-textarea-code-editor/dist.css'

import React, { useEffect, useState } from 'react'

import dynamic from 'next/dynamic'

const CodeEditor = dynamic(
  () => import('@uiw/react-textarea-code-editor').then(mod => mod.default),
  { ssr: false }
)
const monospace =
  'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace'

function Editor(props) {
  const [_code, setCode] = useState(props.code)

  useEffect(() => {
    setCode(props.code)
  }, [props.code])

  return (
    <CodeEditor
      value={_code}
      language="json"
      placeholder="Enter JSON here"
      onChange={evn => {
        if (props.onChangeCode) {
          props.onChangeCode(evn.target.value)
        }
        setCode(evn.target.value)
      }}
      padding={20}
      style={{
        fontSize: 14,
        backgroundColor: '#000',
        border: `1px #fff solid`,
        fontFamily: monospace,
      }}
    />
  )
}

export default Editor
