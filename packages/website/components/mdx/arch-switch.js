import React from 'react'
import { osName } from 'react-device-detect'

/**
 * @param {any} props
 */
export function ArchSwitch(props) {
  return (
    <div className="arch-container mt-6">
      {props.children.map(
        (/** @type {{ props: { case: string; }; }} */ element) => {
          if (
            !element.props ||
            !element.props.case ||
            element.props.case === osName
          ) {
            return element
          }
        }
      )}
    </div>
  )
}
