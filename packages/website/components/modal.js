import React from 'react'
import Cross from '../icons/cross'

/**
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {React.MouseEventHandler} props.onClose
 */

const Modal = ({ onClose, children }) => {
  return (
    <div className="modal-overlay">
      <div role="dialog" className="modal-content">
        <Cross
          className="close pointer"
          width="11"
          height="11"
          onClick={onClose}
        />
        <div>{children}</div>
      </div>
    </div>
  )
}

export default Modal
