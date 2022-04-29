import React from 'react'
import { osName } from 'react-device-detect'

/**
 * @param {any} props
 */
export function ArchSwitch({ children }) {
  return (
    <div className="arch-container mt-6">
      {children.length &&
        children.map((/** @type {{ props: { case: string; }; }} */ element) => {
          if (
            !element.props ||
            !element.props.case ||
            element.props.case === osName
          ) {
            return element
          }

          return null
        })}
    </div>
  )
}
