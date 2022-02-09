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

export function Modal(
  { children, startOpen = false, mode = dialogModes.MODAL },
  ref
) {
  const [isOpen, setIsOpen] = useState(startOpen)
  const [modalId, setModalId] = useState(
    `modal_${Date.now()}_${Math.floor(Math.random() * 1000)}`
  )
  const [modalEl, setModalEl] = useState(null)

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
    return () => {
      document.removeEventListener('keydown', onEsc, false)
    }
  }, [onEsc, isOpen, modalEl, modalId])

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
