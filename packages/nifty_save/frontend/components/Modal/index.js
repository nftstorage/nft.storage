import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'

import { createPortal } from 'react-dom'

export const dialogModes = {
  MODAL: 'modal',
  DIALOG: 'dialog',
}

const NOOP = () => {
  return null
}

export function Modal(
  { children, open = false, mode = dialogModes.MODAL, onClose = NOOP },
  ref
) {
  const [isOpen, setIsOpen] = useState(open)
  const [modalId, setModalId] = useState(
    `modal_${Date.now()}_${Math.floor(Math.random() * 1000)}`
  )
  const [modalEl, setModalEl] = useState(null)

  const close = useCallback(() => {
    setIsOpen(false)
    onClose && onClose()
  }, [onClose])

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
    function appendEl() {
      if (!document.querySelector(`#${modalId}`)) {
        let el = document.createElement('div')
        el.setAttribute('id', modalId)
        document.body.appendChild(el)
      }
      setTimeout(() => {
        setModalEl(document.querySelector(`#${modalId}`))
      })
    }

    if (isOpen) {
      appendEl()
      document.addEventListener('keydown', onEsc, false)
    }

    if (isOpen != open) {
      setIsOpen(open)
    }

    return () => {
      document.removeEventListener('keydown', onEsc, false)
    }
  }, [onEsc, isOpen, modalEl, modalId, open])

  const content = isOpen ? (
    <div className={`modal`}>
      <div className="modal-overlay" onClick={close} />

      <div className="modal-body">
        <span
          role="button"
          className="modal-close interactive"
          aria-label="close"
          onClick={close}
        >
          ✕
        </span>
        <div className="modal-content">{children}</div>
      </div>
    </div>
  ) : null

  console.log(modalEl)

  return modalEl ? createPortal(content, modalEl) : null
}

export default forwardRef(Modal)
