import './styles.css'

import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react'

import { createPortal } from 'react-dom'

const modalElement = document.getElementById('modal-root')

export function Modal({ children, startOpen = false }, ref) {
  const [isOpen, setIsOpen] = useState(startOpen)

  const close = useCallback(() => setIsOpen(false), [])

  useImperativeHandle(
    ref,
    () => ({
      open: () => setIsOpen(true),
      close,
    }),
    [close]
  )

  const onEsc = useCallback(
    (event) => {
      if (event.keyCode === 27) close()
    },
    [close]
  )

  useEffect(() => {
    if (isOpen) document.addEventListener('keydown', onEsc, false)
    return () => {
      document.removeEventListener('keydown', onEsc, false)
    }
  }, [onEsc, isOpen])

  return createPortal(
    isOpen ? (
      <div className={`modal`}>
        <div className="modal-overlay" onClick={close} />
        <span
          role="button"
          className="modal-close"
          aria-label="close"
          onClick={close}
        >
          ✕
        </span>
        <div className="modal-body">{children}</div>
      </div>
    ) : null,
    modalElement
  )
}

export default forwardRef(Modal)
