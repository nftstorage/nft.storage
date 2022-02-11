import * as React from 'react'

const SvgComponent = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    style={{
      margin: 'auto',
      background: '#000',
      display: 'block',
      shapeRendering: 'auto',
    }}
    width={200}
    height={200}
    viewBox="0 0 100 100"
    preserveAspectRatio="xMidYMid"
    {...props}
  >
    <rect x={49.5} y={25} rx={0} ry={0} width={1} height={10} fill="#8cd0e5">
      <animate
        attributeName="opacity"
        values="1;0"
        keyTimes="0;1"
        dur="0.7246376811594202s"
        begin="-0.5434782608695652s"
        repeatCount="indefinite"
      />
    </rect>
    <rect
      x={49.5}
      y={25}
      rx={0}
      ry={0}
      width={1}
      height={10}
      fill="#376888"
      transform="rotate(90 50 50)"
    >
      <animate
        attributeName="opacity"
        values="1;0"
        keyTimes="0;1"
        dur="0.7246376811594202s"
        begin="-0.3623188405797101s"
        repeatCount="indefinite"
      />
    </rect>
    <rect
      x={49.5}
      y={25}
      rx={0}
      ry={0}
      width={1}
      height={10}
      fill="#826b88"
      transform="rotate(180 50 50)"
    >
      <animate
        attributeName="opacity"
        values="1;0"
        keyTimes="0;1"
        dur="0.7246376811594202s"
        begin="-0.18115942028985504s"
        repeatCount="indefinite"
      />
    </rect>
    <rect
      x={49.5}
      y={25}
      rx={0}
      ry={0}
      width={1}
      height={10}
      fill="#de786a"
      transform="rotate(270 50 50)"
    >
      <animate
        attributeName="opacity"
        values="1;0"
        keyTimes="0;1"
        dur="0.7246376811594202s"
        begin="0s"
        repeatCount="indefinite"
      />
    </rect>
  </svg>
)

export default SvgComponent
